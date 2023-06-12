<template>
  <div>
    <div v-if="isloading" class="text-center">
      <p style="font-size: 20px;">Loading...</p>
    </div>
    <div v-else class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title m-0">Subscribers</h5>
      </div>

      <div class="card-body">
        <div class="search d-flex justify-content-between align-items-center">
          <div class="form-group">
            <input class="form-control custom-form-control" type="text" v-model="tableData.search"
              placeholder="Search Table" @input="getData()">
          </div>
          <div class="form-group">
            <select class="form-control custom-select-form-control" v-model="tableData.length" @change="getData()">
              <option v-for="(records, index) in perPage" :key="index" :value="records">{{ records }}</option>
            </select>
          </div>
        </div>
        <DataTable id="dataTable" :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy" class="">
          <tbody>
            <tr v-for="(value, i) in values" :key="value.id">
              <td>{{ i + 1 }}</td>
              <td>{{ value.email }}</td>
              <td>
                <b-button size="sm" :class="value.status == 1 ? 'btn-info' : 'btn-danger'">
                  {{ value.status == 1 ? 'Active' : 'Inactive' }}
                </b-button>
              </td>
              <td>
                <b-button class="btn btn-sm btn-danger" @click="deleteItem(value.id)">
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </b-button>
              </td>
            </tr>
          </tbody>
        </DataTable>

        <pagination :pagination="pagination" @prev="getData(pagination.prevPageUrl)"
          @next="getData(pagination.nextPageUrl)">
        </pagination>

      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "@/components/Datatable/DataTable";
import Pagination from "@/components/Datatable/Pagination";

export default ({
  name: "subscriber-index",
  components: { Pagination, DataTable },
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      { width: '', label: 'Sl', name: 'id' },
      { width: '', label: 'Email', name: 'email' },
      { width: '', label: 'Status', name: 'status' },
      { width: '', label: 'Action', name: '' },
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    return {
      isloading: true,
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
  methods: {
    getData(url = 'subscription-lists') {
      this.tableData.draw++;
      this.$axios.post(url, { params: this.tableData })
        .then((response) => {
          let data = response.data;
          if (this.tableData.draw == data.draw) {
            this.values = data.data.data;
            this.configPagination(data.data);
          }
          this.isloading = false;
        })
        .catch((error) => {
          console.error(error)
        })
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
    async deleteItem(id) {
      let result = confirm("Want to delete?");

      if (result) {
        await this.$axios.$delete('subscription-delete/' + id)
          .then((response) => {
            this.getData()
            this.$izitoast.success({
              title: 'Success !!',
              message: response.message
            })
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }
  }
})
</script>
