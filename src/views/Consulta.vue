<template>
  <div class="px-5 mt-3">
    <div class="d-flex align-items-center justify-content-between">
<!-- <button
        class="btn d-flex align-items-center border"
        v-on:click="regresarInicio()"
      >
        <b-icon-house></b-icon-house>
        <p class="m-0 p-0 ml-1">Inicio</p>
      </button>-->
    </div>

    <h3>Consultar Estudiante</h3>

    <div
      class="container d-flex justify-content-center align-items-center mt-3"
    >
      <p class="m-0 p-0">DOCUMENTO ESTUDIANTE</p>
      <input
        type="text"
        class="input-login ml-3 pl-2"
        v-model="documento"
        onkeypress="return event.keyCode >= 48 && event.keyCode <= 57"
        maxlength="10"
        placeholder="No de documento ..."
      />
      <button
        type="button"
        class="btn btn-primary ml-3"
        v-on:click="consultarEstudiante()"
      >
        CONSULTAR
      </button>
    </div>

    <p class="text-left bg-dark text-white px-4 py-2 mt-3 border rounded">
      double-click to edit
    </p>

    <div class="d-flex mt-3 justify-content-start align-items-center">
      <input
        type="text"
        v-model="search"
        class="input-login pl-2"
        placeholder="FILTRO POR NOMBRE ..."
      />
    </div>

    <b-table
      responsive
      sticky-header
      striped
      bordered
      show-empty
      id="consulta-table"
      class="mt-3"
      :fields="titulos"
      :items="filas"
      :filter="search"
    >
      <template #empty="scope">
        No hay registros que coincidan con su solicitud
      </template>

      <template #cell(nombre)="data">
        <p>{{ data.item.nombre.toUpperCase() }}</p>
      </template>

      <template #cell(documento)="data">
          {{ formatoMiles(data.item.documento) }}
      </template>
    </b-table>

    <b-pagination
      v-if="filasFiltradas.length > 0"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="consulta-table"
    ></b-pagination>

    <agregarEstudiante />
    <editarEstudiante />
  </div>
</template>

<script>
import agregarEstudiante from '../components/modales/AgregarEstudiante.vue'
import editarEstudiante from '../components/modales/EditarEstudiante.vue'

export default {
  name: 'Consulta',
  data () {
    return {
      perPage: 3,
      currentPage: 1,
      documento: '',
      search: '',
      titulos: [
        { key: 'id', label: 'ID' },
        { key: 'nombre', label: 'NOMBRE' },
        { key: 'documento', label: 'CÉDULA' },
        { key: 'nombre_curso', label: 'CURSO' },
        { key: 'fecha_realizacion', label: 'F. REALIZACIÓN' },
        { key: 'fecha_vencimiento', label: 'F. VENCIMIENTO' },
        { key: 'estado', label: 'ESTADO' }
      ],
      filas: []
    }
  },

  components: {
    agregarEstudiante,
    editarEstudiante
  },

  methods: {
    cerrarSesion: function () {
      this.$router.push({
        name: 'Login'
      })
    },

    regresarInicio: function () {
      this.$router.push({
        name: 'Home'
      })
    },

    consultarEstudiante: function () {
      this.$store
        .dispatch('fetchConsultarEstudiante', {
          documento: this.documento
        })
        .then((result) => {
          this.filas = result.DATOS
        })
    },

    formatoMiles (n) {
      // Example -> format number 1000000 to 1,234,567
      return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },

  created () {},

  computed: {
    rows () {
      return this.filas.length
    },

    filasFiltradas: function () {
      if (this.search !== '') {
        return this.filas.filter((element) => {
          return element.nombre
            .toLowerCase()
            .includes(this.search.toLowerCase())
        })
      }
      return this.filas
    }
  }
}
</script>

<style lang="scss">
.input-login {
  width: 300px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
