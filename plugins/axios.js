export default function ({ $axios }) {
    // Set baseURL (both client and server)
    //$axios.setToken(store.state.token, 'Bearer');
    $axios.setBaseURL(process.env.APP_ROOT_API)
}
