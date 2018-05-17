<template>
    <div class="grid">
        <table>
          <thead>
            <div class="head">
              <h3 class="title">{{title}}</h3>
              <h5 class="date">{{date}}</h5>
            </div>
            <tr>
              <th v-for="key in columns"
                @click="sortBy(key)"
                :class="{ active: sortKey == key }">
                {{ key | capitalize }}
                <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in filteredData">
              <td v-for="key in columns">
                {{entry[key]}}
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: 'grid',
    props: {
      data: Array,
      columns: Array,
      filterKey: String,
      title: String,
      date: String,
    },
    data: function () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    computed: {
      filteredData: function () {
        var sortKey = this.sortKey
        var filterKey = this.filterKey && this.filterKey.toLowerCase()
        var order = this.sortOrders[sortKey] || 1
        var data = this.data
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    }
  }
</script>

<style scoped>
  .grid {
    color: white;
    margin: inherit;
    background-color: rgb(61, 61, 61);
  }

  .title {
    float: left;
    vertical-align: middle;
  }

  .date {
    float: right;
    text-align: right;
    vertical-align: middle;
  }
  .head {
    clear: both;
    vertical-align: middle;
  }

  th, td {
    border: 1px solid rgb(146, 146, 146);
  }
</style>