<template>
  <b-card>
    <b-card-text>
      <slot name="text"></slot>
    </b-card-text>
    <b-card-footer>
      <slot name="buttons"></slot>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  name: 'base-card',
}
</script>
