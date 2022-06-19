<template>
  <div>
    <b-card border-variant="light" class="card-stats">
      <div class="card-header card-header-accent d-flex justify-content-between align-items-center">
        <p class="card-title">
          <span>Landlords</span>
        </p>
        <nuxt-link :to="{ name: 'users-landlords-create' }" class="btn btn-dark">
          Add Landlord
        </nuxt-link>
      </div>
      <div class="card-body">
        <DataTable id="dataTable" :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy" class="">
          <tbody v-for="(value,i) in values" :key="value.id">
          <tr >
          </tr>
          </tbody>
        </DataTable>
      </div>
    </b-card>
  </div>
</template>

<script>
import DataTable from "@/components/Datatable/DataTable";
export default {
  name: "index",
  components: {DataTable},
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      {width: '', label: 'Sl', name: 'id' },
      {width: '', label: 'Name', name: 'name'},
      {width: '', label: 'Email', name: 'email'},
      {width: '', label: 'Action', name: ''},
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    return {
      values: [],
      sum: [],
      columns: columns,
      sortKey: 'id',
      sortOrders: sortOrders,
      perPage: ['10', '25', '50','100','500','2000','all'],
      tableData: {
        draw: 0,
        length: 10,
        search: '',
        column: 0,
        dir: 'desc',
      },
      pagination: {
        lastPage: '',
        currentPage: '',
        total: '',
        lastPageUrl: '',
        nextPageUrl: '',
        prevPageUrl: '',
        from: '',
        to: ''
      },
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.tableData.draw++;
      //this.$axios.setToken(this.$auth.strategy.token.get(), 'Bearer');
      // this.$axios.post('/all-admin?page=2', {lim:3})
      //   .then(response => {
      //     console.log(response.data)
      //
      //   })
      //   .catch(errors => {
      //     //console.log(errors);
      //   }).finally(() => {
      //
      // });
    },
    configPagination(data) {
      this.pagination.lastPage = data.last_page;
      this.pagination.currentPage = data.current_page;
      this.pagination.total = data.total;
      this.pagination.lastPageUrl = data.last_page_url;
      this.pagination.nextPageUrl = data.next_page_url;
      this.pagination.prevPageUrl = data.prev_page_url;
      this.pagination.from = data.from;
      this.pagination.to = data.to;
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.tableData.column = this.getIndex(this.columns, 'name', key);
      this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
      this.getData();
    },
    getIndex(array, key, value) {
      return array.findIndex(i => i[key] == value)
    },
  }
}
</script>

<style scoped>

</style>
