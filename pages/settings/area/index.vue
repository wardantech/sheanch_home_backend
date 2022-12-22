<template>
    <div>
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="card-title m-0">Property Type List</h5>
  
          <nuxt-link :to="{ name: 'settings-area-create' }" class="btn btn-sm btn-info">
            <font-awesome-icon icon="fa-solid fa-plus"/>
            Add Area
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
            <tr v-for="(value, i) in values" :key="value">
              <td>{{i++}}</td>
              <td>{{value.name}}</td>
              <td>{{value.bn_name}}</td>
              <td>{{value.division.name}}</td>
              <td>{{value.district.name}}</td>
              <td>{{value.thana.name}}</td>
              <td>
                <nuxt-link :to="{name:'settings-area-id-edit',params: { id: value.id }}" rel="tooltip"
                           class="btn btn-sm btn-info btn-simple"
                           title="Edit">
                  <font-awesome-icon icon="fa-solid fa-pen-to-square"/>
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
      components: {Pagination, DataTable},
      created() {
        this.getData();
      },
      data() {
        let sortOrders = {};
        let columns = [
          {width: '', label: 'Sl', name: 'id'},
          {width: '', label: 'Name', name: 'bn_name'},
          {width: '', label: 'BN Name', name: 'name'},
          {width: '', label: 'Division', name: 'division'},
          {width: '', label: 'District', name: 'district'},
          {width: '', label: 'Thana', name: 'thana'},
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
  
      methods: {
        getData(url = '/settings/area') {
          this.tableData.draw++;
          this.$axios.get(url)
            .then(response => {
              // let data1 = response.data.data.data;
              let data1 = response.data.data.area;
                this.values = data1;
                console.log(this.values);
                this.configPagination(data1);
            })
            .catch(errors => {
              //console.log(errors);
            }).finally(() => {
          });
        },
  
        async deleteItem(id) {
          let result = confirm("Want to delete?");
  
          if (result) {
            await this.$axios.$delete('settings/area/' + id)
              .then(response => {
                if (id) {
                  this.values.splice(this.values.indexOf(id), 1);
                }
                this.$izitoast.success({
                  title: 'Success !!',
                  message: 'Area type deleted successfully!'
                });
              })
              .catch(error => {
                if (error.response.status == 422) {
                  this.errors = error.response.data.errors
                }
                else {
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
  