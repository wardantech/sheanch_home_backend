<template>
  <div>
    <b-row>
      <b-col>
        <b-card border-variant="light" class="card-stats" >
          <div class="card-header card-header-accent">
            <p class="card-title"><span>asd: {{ loggedInUser }}</span></p>
          </div>
          <div class="card-footer">
            <div class="status">Pending Amount</div>
          </div>
        </b-card>
      </b-col>

      <b-col>
        <b-card border-variant="light" class="card-stats" >
          <div class="card-header card-header-info">
            <p class="card-title">15,000.00</p>
          </div>
          <div class="card-footer">
            <div class="status">Pending Amount</div>
          </div>
        </b-card>
      </b-col>

      <b-col>
        <b-card border-variant="light" class="card-stats" >
          <div class="card-header card-header-accent">
            <p class="card-title">15,000.00</p>
          </div>
          <div class="card-footer">
            <div class="status">Pending Amount</div>
          </div>
        </b-card>
      </b-col>
      <b-col>
        <b-card border-variant="light" class="card-stats" >
          <div class="card-header card-header-info">
            <p class="card-title">15,000.00</p>
          </div>
          <div class="card-footer">
            <div class="status">Pending Amount</div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <!--Body Card-->
    <b-row class="mt-5">
      <b-col>
        <b-card title="Table Title">

        </b-card>
      </b-col>
    </b-row>


  </div>
</template>

<script>
export default {
  name: "create"
}
</script>

<style scoped>

</style>
