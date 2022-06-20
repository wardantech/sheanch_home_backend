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

        <div class="row form-group">
          <div class="col-md-4">
            <input class="form-control " type="text" v-model="tableData.search" placeholder="Search Table" @input="getData()">
          </div>
          <div class="col-md-6"></div>

          <div class="col-md-2">
            <select class="form-control" v-model="tableData.length" @change="getData()">
              <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
            </select>
          </div>
        </div>

        <DataTable id="dataTable" :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy" class="">
          <tbody v-for="(value,i) in values" :key="value.id">
          <tr >
            <td>{{i+1}}</td>
            <td>{{value.name}}</td>
            <td  >
              <nuxt-link :to="{name:'users-landlords-id-edit',params: { id: value.id }}"
                           rel="tooltip" class="btn btn-success btn-simple"
                           title="Edit">
                <i class="material-icons">edit</i>
              </nuxt-link>
<!--              <a @click="deleteCategory(value.id)"-->
<!--                 rel="tooltip" class="btn btn-danger btn-simple"-->
<!--                 style="color: white"-->
<!--                 title="Delete">-->
<!--                <i class="material-icons">close</i>-->
<!--              </a>-->
            </td>
          </tr>
          </tbody>
        </DataTable>

        <pagination :pagination="pagination"
                    @prev="getData(pagination.prevPageUrl)"
                    @next="getData(pagination.nextPageUrl)">
        </pagination>
      </div>
    </b-card>
  </div>
</template>

<script>
import DataTable from "@/components/Datatable/DataTable";
import Pagination from "@/components/Datatable/Pagination";

export default {
  name: "index",
  components: {Pagination, DataTable},
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      {width: '', label: 'Sl', name: 'id' },
      {width: '', label: 'Name', name: 'name'},
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
        length: '',
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
        to: '',
      },
    }
  },
  methods: {
    getData(url = '/landlord/list') {
      this.tableData.draw++;
      this.$axios.post(url, {params: this.tableData})
        .then(response => {
          let data = response.data;
          if (this.tableData.draw == data.draw) {
            this.values = data.data.data;
            console.log(this.values);
            this.configPagination(data.data);
          }
        })
        .catch(errors => {
          //console.log(errors);
        }).finally(() => {

      });
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
