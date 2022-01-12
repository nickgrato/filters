<template>
  <div></div>
</template>

<script>

import { AndSpecification, OrSpecification, PriceSpecification, MegaFilter } from 'scripts/....'

export default {
  name: 'Collection',
  methods: {

    filterProducts() {
      // Init a New MegaFilter
      const megaFilter = new MegaFilter()

      // Price
      const price_spec = new PriceSpecification(this.filterPrice.data.applied)

      // Group Specs
      const allOptions = new OrSpecification(price_spec)
      const finalSpec = new AndSpecification(allOptions)

      this.filteredProductsPreSort = megaFilter.filter(this.products, finalSpec)
    }
}
</script>

<style lang="scss" scoped></style>
