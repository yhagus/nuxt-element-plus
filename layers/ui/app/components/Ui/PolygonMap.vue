<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as L from 'leaflet';
import 'leaflet-draw';

const props = defineProps<{
  modelValue?: number[][][] | null;
  height?: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[][][] | null): void;
}>();

const mapElement = ref<HTMLDivElement | null>(null);
let map: L.Map | null = null;
let drawnLayer: L.FeatureGroup | null = null;
let drawControl: L.Control.Draw | null = null;
let isSyncing = false;
let resizeObserver: ResizeObserver | null = null;

const defaultCenter: L.LatLngExpression = [-6.2, 106.8];

function isLatLng(value: unknown): value is L.LatLng {
  return Boolean(value && typeof (value as L.LatLng).lat === 'number' && typeof (value as L.LatLng).lng === 'number');
}

function toLatLngs(coords: number[][][]): L.LatLngExpression[][] {
  return coords.map(ring => ring.map(([lng, lat]) => [lat, lng] as L.LatLngExpression));
}

function normalizeLatLngs(latlngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][]): L.LatLng[][] {
  if (latlngs.length === 0) {
    return [];
  }

  const first = latlngs[0] as L.LatLng | L.LatLng[] | L.LatLng[][];
  if (isLatLng(first)) {
    return [latlngs as L.LatLng[]];
  }

  if (Array.isArray(first) && first.length && isLatLng(first[0])) {
    return latlngs as L.LatLng[][];
  }

  if (Array.isArray(first) && first.length && Array.isArray(first[0])) {
    return (latlngs as L.LatLng[][][])[0] ?? [];
  }

  return [];
}

function closeRing(ring: number[][]) {
  if (ring.length < 2) {
    return ring;
  }
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (first[0] === last[0] && first[1] === last[1]) {
    return ring;
  }
  return [...ring, [...first]];
}

function toCoordinates(latlngs: L.LatLng[] | L.LatLng[][] | L.LatLng[][][]): number[][][] {
  const rings = normalizeLatLngs(latlngs);
  return rings.map(ring => closeRing(ring.map(point => [point.lng, point.lat])));
}

function updateFromLayers() {
  if (!drawnLayer) {
    return;
  }
  const layers = drawnLayer.getLayers();
  if (!layers.length) {
    emit('update:modelValue', null);
    return;
  }

  const polygon = layers[0] as L.Polygon;
  const coordinates = toCoordinates(polygon.getLatLngs());
  emit('update:modelValue', coordinates);
}

function renderPolygon(coordinates: number[][][] | null | undefined) {
  if (!drawnLayer || !map) {
    return;
  }

  drawnLayer.clearLayers();
  if (!coordinates || !coordinates.length) {
    return;
  }

  const polygon = L.polygon(toLatLngs(coordinates));
  drawnLayer.addLayer(polygon);
  map.fitBounds(polygon.getBounds(), { padding: [24, 24] });
}

onMounted(() => {
  if (!mapElement.value) {
    return;
  }

  map = L.map(mapElement.value).setView(defaultCenter, 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  drawnLayer = new L.FeatureGroup();
  map.addLayer(drawnLayer);

  drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnLayer,
    },
    draw: {
      polyline: false,
      rectangle: false,
      circle: false,
      circlemarker: false,
      marker: false,
      polygon: {
        allowIntersection: false,
        showArea: true,
      },
    },
  });

  map.addControl(drawControl);

  map.on(L.Draw.Event.CREATED, (event: L.LeafletEvent) => {
    if (!drawnLayer) {
      return;
    }
    const layer = (event as L.LeafletEvent & { layer: L.Layer }).layer;
    drawnLayer.clearLayers();
    drawnLayer.addLayer(layer);
    updateFromLayers();
  });

  map.on(L.Draw.Event.EDITED, () => {
    updateFromLayers();
  });

  map.on(L.Draw.Event.DELETED, () => {
    updateFromLayers();
  });

  renderPolygon(props.modelValue);

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      map?.invalidateSize();
    });
    resizeObserver.observe(mapElement.value);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  if (map) {
    map.remove();
  }
  map = null;
  drawnLayer = null;
  drawControl = null;
});

watch(
  () => props.modelValue,
  (value) => {
    if (!map || !drawnLayer || isSyncing) {
      return;
    }
    isSyncing = true;
    renderPolygon(value ?? null);
    isSyncing = false;
  },
  { deep: true },
);
</script>

<template>
  <div class="ui-polygon-map">
    <div
      ref="mapElement"
      class="ui-polygon-map__canvas"
      :style="{ height: `${props.height ?? 320}px` }"
    />
    <div class="ui-polygon-map__hint">
      Gunakan alat gambar untuk membuat area site. Klik polygon untuk edit atau hapus.
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-polygon-map {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__canvas {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  &__hint {
    font-size: 0.75rem;
    color: #6b7280;
  }
}
</style>
