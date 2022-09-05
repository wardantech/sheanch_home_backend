<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title m-0">All Reviews</h5>
      </div>

      <div class="card-body">
        <div class="search d-flex justify-content-between align-items-center">
          <div class="form-group">
            <input class="form-control custom-form-control" type="text" v-model="tableData.search"
                   placeholder="Search Table" @input="getData()">
          </div>
          <div class="form-group">
            <select class="form-control custom-select-form-control" v-model="tableData.length" @change="getData()">
              <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
            </select>
          </div>
        </div>

        <DataTable id="dataTable" :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy"
                   class="">
          <tbody>
          <tr v-for="(value,i) in values" :key="value.id">
            <td>{{i+1}}</td>
            <td>
              {{ value.review }}
            </td>

            <td v-if="value.review_type === 1"><b-badge pill variant="primary">Property Review</b-badge></td>
            <td v-if="value.review_type === 2"><b-badge pill variant="info">Landlord Review</b-badge></td>
            <td v-if="value.review_type === 3"><b-badge pill variant="success">Tenant Review</b-badge></td>

            <td v-if="value.reviewer_type === 2"><b-badge pill variant="info">Landlord</b-badge></td>
            <td v-if="value.reviewer_type === 3"><b-badge pill variant="success">Tenant</b-badge></td>

            <td>
              <nuxt-link v-if="value.review_type === 1" :to="{name:'properties-id-show',params: { id: value.review_type_id }}" rel="tooltip"
                         class="btn btn-sm btn-primary btn-simple"
                         title="View property details">
                <font-awesome-icon icon="fa-solid fa-building-circle-arrow-right" />
              </nuxt-link>

              <nuxt-link v-if="value.reviewer_type === 2" :to="{name:'users-landlords-id-show',params: { id: value.review_type_id }}" rel="tooltip"
                         class="btn btn-sm btn-info btn-simple"
                         title="View landlord details">
                <font-awesome-icon icon="fa-solid fa-user" />
              </nuxt-link>

              <nuxt-link v-if="value.reviewer_type === 3" :to="{name:'users-tenants-id-show',params: { id: value.review_type_id }}" rel="tooltip"
                         class="btn btn-sm btn-info btn-simple"
                         title="View tenant details">
                <font-awesome-icon icon="fa-solid fa-user" />
              </nuxt-link>

              <b-button class="btn btn-sm btn-danger" @click="deleteItem(value.id)">
                <font-awesome-icon icon="fa-solid fa-trash"/>
              </b-button>
            </td>
          </tr>
          </tbody>
        </DataTable>

        <pagination :pagination="pagination"
                    @prev="getData(pagination.prevPageUrl)"
                    @next="getData(pagination.nextPageUrl)">
        </pagination>

      </div>
    </div>
  </div>
</template>

<script>
  import DataTable from "@/components/Datatable/DataTable";
  import Pagination from "@/components/Datatable/Pagination";

  export default {
    name: "index",
    components: {DataTable, Pagination},
    data() {
      let sortOrders = {};
      let columns = [
        {width: '', label: 'Sl', name: 'id'},
        {width: '', label: 'Review', name: 'review'},
        {width: '', label: 'Review Type', name: 'review_type'},
        {width: '', label: 'Reviewer Type', name: 'reviewer_type'},
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
        perPage: ['10', '25', '50', '100', '500', '2000', 'all'],
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
          to: '',
        },
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData(url = '/reviews/get-list') {
        this.tableData.draw++;
        this.$axios.post(url, {params: this.tableData})
          .then(response => {
            let data = response.data;
            if (this.tableData.draw == data.draw) {
              this.values = data.data.data;
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
