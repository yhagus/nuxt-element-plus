<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as L from 'leaflet';

const props = defineProps<{
  modelValue?: number[] | null;
  height?: number;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[] | null): void;
}>();

const mapElement = ref<HTMLDivElement | null>(null);
let map: L.Map | null = null;
let marker: L.Marker | null = null;
let resizeObserver: ResizeObserver | null = null;
let isSyncing = false;

const defaultCenter: L.LatLngExpression = [-6.2, 106.8];

function setMarker(latlng: L.LatLng) {
  if (!map) {
    return;
  }

  if (!marker) {
    marker = L.marker(latlng, { draggable: true }).addTo(map);
    marker.on('dragend', () => {
      const next = marker?.getLatLng();
      if (next) {
        emit('update:modelValue', [next.lng, next.lat]);
      }
    });
  } else {
    marker.setLatLng(latlng);
  }
}

function renderMarker(value: number[] | null | undefined) {
  if (!map) {
    return;
  }

  if (!value || value.length < 2) {
    if (marker) {
      marker.remove();
      marker = null;
    }
    return;
  }

  const [lng, lat] = value;
  const latlng = L.latLng(lat, lng);
  setMarker(latlng);
  map.setView(latlng, map.getZoom() || 13);
}

onMounted(() => {
  if (!mapElement.value) {
    return;
  }

  const initial = props.modelValue?.length
    ? L.latLng(props.modelValue[1], props.modelValue[0])
    : L.latLng(defaultCenter as L.LatLngExpression);

  map = L.map(mapElement.value).setView(initial, 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  if (props.modelValue?.length) {
    renderMarker(props.modelValue);
  }

  map.on('click', (event: L.LeafletMouseEvent) => {
    const { latlng } = event;
    setMarker(latlng);
    emit('update:modelValue', [latlng.lng, latlng.lat]);
  });

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
  marker = null;
});

watch(
  () => props.modelValue,
  (value) => {
    if (!map || isSyncing) {
      return;
    }
    isSyncing = true;
    renderMarker(value ?? null);
    isSyncing = false;
  },
  { deep: true },
);
</script>

<template>
  <div class="ui-point-map">
    <div
      ref="mapElement"
      class="ui-point-map__canvas"
      :style="{ height: `${props.height ?? 320}px` }"
    />
    <div class="ui-point-map__hint">
      Klik peta untuk memilih lokasi POP. Geser marker untuk menyesuaikan.
    </div>
  </div>
</template>

<style scoped lang="scss">
.ui-point-map {
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
