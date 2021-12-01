<template>
  <div class="container mt-3 py-3 px-4 border" style="width: 500px">
    <h3>Logo</h3>

    <div class="d-flex align-items-center mx-auto my-auto mt-3">
      <p class="w-25 m-0 p-0">Usuario</p>
      <input class="pl-2 ml-2 w-75 input-login" type="text" v-model="usuario" />
    </div>

    <div class="d-flex align-items-center mx-auto mt-3">
      <p class="w-25 m-0 p-0">Contraseña</p>
      <input class="pl-2 ml-2 w-75 input-login" type="password" v-model="clave" />
    </div>

    <button
      type="button"
      class="btn btn-primary mt-3 w-100"
      v-on:click="iniciarSesion()"
    >
      Ingresar
    </button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},

  data () {
    return {
      usuario: '',
      clave: ''
    }
  },

  props: {},

  mounted () {},

  computed: {},

  methods: {
    iniciarSesion: function () {
      const payload = {
        usuario: this.usuario,
        clave: this.clave
      }
      this.$store.dispatch('fetchIniciarSesion', payload).then((result) => {
        if (result.CODIGO === 1) {
          this.$router.push({
            name: 'Home'
          })
        } else {
          alert(result.MENSAJE)
        }
      })
    }
  }
}
</script>

<style lang="scss">
$colorNegro: #3e3f53;
$colorAzul: #1f5ca9;
$colorAzulClaro: #4e92fc;
$colorGris: #a8c3de;
$colorGrisClaro: #f1f9ff;
$colorFondo: #eef6f8;
$colorRojo: #ed3237;

.input-login {
  height: 35px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}

.contenedor-modal {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: none;
  overflow: auto;

  .back {
    width: 100vw;
    height: 100vh;
    position: absolute;
  }

  .modal-custom {
    width: 26.25rem; // 420px
    min-height: 17.625rem; // 282px
    margin: 100px auto;
    border-radius: 16px;
    background-color: $colorFondo;
    position: relative;
    z-index: 10;

    header {
      display: flex;
      position: relative;

      h2 {
        width: 100%;
        padding: 3.125rem 0 1.875rem 0; // 50px 0 30px 0
        font-family: "Roboto", sans-serif;
        font-size: 1.125rem; // 18px
        color: $colorAzul;
        font-weight: 500;
        text-align: center;
      }

      button {
        width: 1.5rem; // 24px
        height: 1.5rem; // 24px
        border: 0;
        border-radius: 50%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 20px;
        right: 20px;

        svg {
          font-size: 1.5rem; // 24px
          color: $colorAzul;
        }
      }
    }

    main {
      padding: 0 2.5rem 3.125rem 2.5rem; // 0 40px 50px 40px
      p {
        margin: 0;
        margin-bottom: 1.125rem; // 18px
        font-family: "Roboto", sans-serif;
        font-size: 0.875rem; // 14px
        color: $colorNegro;
        text-align: center;
      }

      .contenedor-opciones-modal {
        margin-top: 2rem; // 18px
        display: flex;
      }
    }
  }
}
</style>
