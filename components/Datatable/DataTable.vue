<!-- Datatable pagination component-->
<!-- @author Asif Anam Khan <somuddro249@gmail.com>-->
<!-- @package component/Datable-->

<template>

  <table class="table">
    <thead class="">
    <tr>
      <th class="font-weight-bold" v-for="column in columns" :key="column.name" @click="$emit('sort', column.name)"
          :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'"
          :style="'width:'+column.width+';'+'cursor:pointer;'">
        {{ column.label }}
      </th>
    </tr>
    </thead>
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: "DataTable",

  props: ['columns', 'sortKey', 'sortOrders']

}
</script>

<style scoped>
.sorting_asc{

}
</style>