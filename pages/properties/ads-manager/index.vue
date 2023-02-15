<template>
  <div>
    <div v-if="isloading" class="text-center">
      <p style="font-size: 20px;">Loading...</p>
    </div>
    <div v-else class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title m-0">Property Ad List</h5>

        <nuxt-link :to="{ name: 'properties-ads-manager-create' }" class="btn btn-sm btn-info">
          <font-awesome-icon icon="fa-solid fa-plus" />
          Add Property Ad
        </nuxt-link>
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
        <DataTable id="dataTable" :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy"
          class="">
          <tbody>
            <tr v-for="(value, i) in values" :key="value.id">
              <td>{{ i + 1 }}</td>

              <td>{{ value.start_date }}</td>
              <td>{{ value.end_date }}</td>
              <td>{{ value.landlord.name }}</td>
              <td>{{ value.rent_amount }}</td>
              <td>{{ value.security_money }}</td>
              <td>
                <div v-if="value.sale_type == 1"> Rent</div>
                <div v-if="value.sale_type == 2"> Sale</div>
              </td>
              <td>
                <b-button @click="statusChange({ id: value.id, status: value.status })"
                  :class="value.status == 1 ? 'btn-sm btn-info' : 'btn-sm btn-danger'">
                  {{ value.status == 1 ? 'Active' : 'Inactive' }}
                </b-button>
              </td>
              <td>
                <nuxt-link :to="{ name: 'properties-id-show', params: { id: value.property_id } }" rel="tooltip"
                  class="btn btn-sm btn-info btn-warning" title="View property">
                  <font-awesome-icon icon="fa-solid fa-hotel" />
                </nuxt-link>

                <nuxt-link :to="{ name: 'properties-ads-manager-id-edit', params: { id: value.id } }" rel="tooltip"
                  class="btn btn-sm btn-success btn-simple" title="Edit">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                </nuxt-link>
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

export default {
  name: "index",
  components: { Pagination, DataTable },
  created() {
    this.getData();
  },
  data() {
    let sortOrders = {};
    let columns = [
      { width: '', label: 'Sl', name: 'id' },
      { width: '', label: 'Start Date', name: 'start_date' },
      { width: '', label: 'End Date', name: 'end_date' },
      { width: '', label: 'Landlord', name: 'landlord' },
      { width: '', label: 'Amount', name: 'rent_amount' },
      { width: '', label: 'Security Am', name: 'security_money' },
      { width: '', label: 'Type', name: 'sale type' },
      { width: '', label: 'Status', name: '' },
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
    getData(url = '/property/ad/list') {
      this.tableData.draw++;
      this.$axios.post(url, { params: this.tableData })
        .then(response => {
          let data = response.data;
          if (this.tableData.draw == data.draw) {
            this.values = data.data.data;
            this.configPagination(data.data);
          }
          this.isloading = false;
        }).catch(error => {
          alert(error);
        });
    },
    async statusChange(params) {
      await this.$axios.$post('property/ad/change-status/' + params.id, params)
        .then(response => {
          this.getData();
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Property ad status change successfully!'
          });
        }).catch(error => {
          alert(error);
        });
    },
    async deleteItem(id) {
      let result = confirm("Want to delete?");

      if (result) {
        await this.$axios.$post('property/ad/delete/' + id)
          .then(response => {
            this.getData();
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Property Ad deleted successfully!'
            });
          }).catch(error => {
            alert(error);
          });
      }
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
