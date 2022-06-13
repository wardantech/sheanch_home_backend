<template>
    <div>
        <div class="login-section">
            <b-container>
                <b-row class="justify-content-center">
                    <b-col cols="6" class="text-center mb-5">
                        <h2 class="heading-section">SEANCH LOGIN</h2>
                    </b-col>
                </b-row>
                <b-row class="justify-content-center">
                    <b-col cols="12" md="8" lg="10">
                        <div class="main-wrap d-md-flex">
                            <b-img class="login-img" src="../../assets/images/login.jpeg"></b-img>
                            <div class="login-wrap p-4 p-md-5">
                                <div class="d-flex">
                                    <div class="w-100">
                                        <h4 class="mb-4">Sign In</h4>
                                    </div>
                                </div>
                                <b-form class="signin-form">
                                    <b-form-group label="Your E-mail" label-for="email">
                                        <b-form-input type="email" id="email" name="email" placeholder="Enter E-mail" required></b-form-input>
                                    </b-form-group>

                                    <b-form-group label="Your Password" label-for="password">
                                        <b-form-input type="password" id="password" name="password" placeholder="Enter Password" required></b-form-input>
                                    </b-form-group>

                                    <b-form-group>
                                        <b-button block variant="primary">Login</b-button>
                                    </b-form-group>
                                </b-form>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>
