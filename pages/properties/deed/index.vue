<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title m-0">Deed List</h5>

        <!--        <nuxt-link :to="{ name: 'users-landlords-create' }" class="btn btn-info">-->
        <!--          <font-awesome-icon icon="fa-solid fa-plus" />-->
        <!--          Add Lease-->
        <!--        </nuxt-link>-->
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
          <tr v-for="(value,i) in values" :key="value.id">
          <tr v-for="(value,i) in values" :key="value.id">
            <td>{{ i + 1 }}</td>
            <td>{{ value.landlord.name }}</td>
            <td>{{ value.tenant.name }}</td>
            <td>{{ value.property.name }}</td>
            <td>
              <div v-if="value.property.sale_type == 1"> Rent</div>
              <div v-if="value.property.sale_type == 2"> Sale</div>
            </td>
            <td>{{ value.property_ad.rent_amount }}</td>
            <td>
              <select @change="statusChange({id:value.id, status: $event.target.value})" name="" id="status"
                      class="form-control custom-select-form-control">
                <option :selected="value.status == 0" value="0">Pending</option>
                <option :selected="value.status == 1" value="1">Send to landlord</option>
                <option :selected="value.status == 2" value="2">Completed</option>
                <option :selected="value.status == 3" value="3">Decline</option>
              </select>
            </td>
            <td>
              <nuxt-link :to="{name:'properties-id-show',params: { id: value.property_id }}" rel="tooltip"
                         class="btn btn-sm btn-info btn-simple"
                         title="View property">
                <font-awesome-icon icon="fa-solid fa-hotel"/>
              </nuxt-link>
              <!--              <nuxt-link :to="{name:'properties-id-edit',params: { id: value.id }}" rel="tooltip"-->
              <!--                         class="btn btn-sm btn-success btn-simple"-->
              <!--                         title="Edit">-->
              <!--                <font-awesome-icon icon="fa-solid fa-edit"/>-->
              <!--              </nuxt-link>-->
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
  components: {Pagination, DataTable},
  created() {
    this.getData();
  },
  computed: {
    // imageUrl(){
    //   return `${process.env.APP_ROOT_IMG_URL}/`
    // }
  },

  data() {
    let sortOrders = {};
    let columns = [
      {width: '', label: 'Sl', name: 'id'},
      {width: '', label: 'Landlord', name: 'landlord_id'},
      {width: '', label: 'Tenant', name: 'tenant_id'},
      {width: '', label: 'Property', name: 'property_id'},
      {width: '', label: 'Type', name: 'lease_type'},
      {width: '', label: 'Amount', name: 'rent_amount'},
      {width: '', label: 'Status', name: 'status'},
      {width: '', label: 'Action', name: ''},
    ];
    columns.forEach((column) => {
      sortOrders[column.name] = -1;
    });
    return {
      status: '',
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
    getData(url = 'property/deed/list') {
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

    async statusChange(params) {
      await this.$axios.$post('property/deed/change-status/' + params.id, params)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Deed status change successfully!'
          })
          this.getData()
        })
        .catch(error => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          } else {
            alert(error.response.message)
          }
        })
    },

    // Landloard Delete logic
    async deleteItem(id) {
      let result = confirm("Want to delete?");

      if (result) {
        await this.$axios.$post('property/deed/delete/' + id)
          .then(response => {
            if (id) {
              this.getData()
            }
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Property deed deleted successfully!'
            });
          })
          .catch(error => {
            if (error.response.status == 422) {
              this.errors = error.response.data.errors
            } else {
              alert(error.response.message)
            }
          })
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

<style scoped>

</style>
