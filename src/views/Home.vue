<template>
  <div class="px-5 mt-3">
    <div class="d-flex align-items-center justify-content-end">
      <button
        class="btn d-flex align-items-center border"
        v-on:click="cerrarSesion()"
      >
        <b-icon-box-arrow-right></b-icon-box-arrow-right>
        <p class="m-0 p-0 ml-1">Salir</p>
      </button>
    </div>

    <div class="d-flex justify-content-start">
      <button
        type="button"
        class="btn border d-flex align.items-center"
        v-on:click="exportarDatos()"
      >
        <b-icon-download></b-icon-download>
        <p class="m-0 p-0 ml-2">Exportar</p>
      </button>

      <button
        type="button"
        class="btn border d-flex align.items-center ml-3"
        onclick="document.getElementById('fileChooser').click()"
      >
        <b-icon-upload></b-icon-upload>
        <p class="m-0 p-0 ml-2">Cargar datos</p>
      </button>

      <input
        type="file"
        id="fileChooser"
        accept=".xlsx"
        class="d-none"
        @change="cargarArchivo"
      />
    </div>

    <p class="text-left bg-dark text-white px-4 py-2 mt-3 border rounded">
      double-click to edit
    </p>

    <div class="d-flex mt-3 justify-content-start align-items-center">
      <input
        type="text"
        v-model="search"
        class="input-login pl-2"
        placeholder="BUSCAR ESTUDIANTE ..."
      />
      <button class="btn border ml-5" v-b-modal.modal-agregar>AGREGAR</button>
      <button class="btn border" v-b-modal.modal-editar>EDITAR</button>
      <button
        class="btn border d-flex align-items-center"
        v-on:click="notificarUsuarios()"
      >
        <b-icon-envelope></b-icon-envelope>
        <p class="m-0 p-0 ml-2">NOTIFICAR</p>
      </button>
    </div>

    <b-table
      responsive
      sticky-header
      striped
      bordered
      show-empty
      id="my-table"
      class="mt-3"
      :fields="titulos"
      :items="filas"
      :filter="search"
      @row-dblclicked="doubleClick($event)"
    >
      <template #empty="scope">
        There are no records matching your request
      </template>

      <template #cell(documento_estudiante)="data">
        {{ formatoMiles(data.item.documento_estudiante) }}
      </template>

      <template #cell(nombre_estudiante)="data">
        <p>{{ data.item.nombre_estudiante.toUpperCase() }}</p>
      </template>

      <template #cell(opciones)="data">
        <div class="d-flex justify-content-between">
          <button
            type="button"
            class="btn btn-primary border"
            v-on:click="verInfoEstudiante(data.item.id)"
          >
            Ver
          </button>
          <button
            type="button"
            class="btn btn-danger border"
            v-on:click="eliminarEstudiante(data.item.id)"
          >
            Borrar
          </button>
        </div>
      </template>
    </b-table>

    <b-pagination
      v-if="filasFiltradas.length > 0"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <agregarEstudiante />
    <editarEstudiante />
    <verEstudiante />
    <borrarEstudiante />
  </div>
</template>

<script>
import axios from "axios";
import Bus from "@/helper/bus.js";
import agregarEstudiante from "../components/modales/AgregarEstudiante.vue";
import editarEstudiante from "../components/modales/EditarEstudiante.vue";
import verEstudiante from "../components/modales/VerEstudiante.vue";
import borrarEstudiante from "../components/modales/BorrarEstudiante.vue";

export default {
  name: "Home",
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      search: "",
      titulos: [
        { key: "id", label: "ID" },
        { key: "nombre_estudiante", label: "NOMBRE" },
        { key: "documento_estudiante", label: "CÉDULA" },
        { key: "telefono_estudiante", label: "TELÉFONO" },
        { key: "correo_estudiante", label: "CORREO" },
        { key: "nombre_curso", label: "CURSO" },
        { key: "fecha_realizacion", label: "F. REALIZACIÓN" },
        { key: "fecha_vencimiento", label: "F. VENCIMIENTO" },
        { key: "estado", label: "ESTADO" },
        { key: "opciones", label: "OPCIONES" },
      ],
      filas: [],
    };
  },

  components: {
    agregarEstudiante,
    editarEstudiante,
    verEstudiante,
    borrarEstudiante,
  },

  methods: {
    cerrarSesion: function () {
      this.$router.push({
        name: "Login",
      });
    },

    notificarUsuarios: function () {
      this.$store.dispatch("fetchNotificarUsuarios", { can_dias: process.env.VUE_APP_TIEMPO_NOTIFICACION}).then((result) => {
        if (result.CODIGO === 1) {
          alert("Los usuarios han sido notificados exitosamente");
        } else {
          alert("Error al notificar a los usuarios");
        }
      });
    },

    cargarArchivo(event) {
      const localAxios = axios.create({
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });

      localAxios.defaults.baseURL = "http://localhost:5000/estudiantes";
      let formData = new FormData();
      formData.append("archivo", event.target.files[0]);
      localAxios.post("importar_excel", formData).then((result) => {
        if (result.status === 200) {
          alert(
            "La información de los estudiantes ha sido guardada exitosamente"
          );
          this.$router.go(0);
        } else {
          alert("Error al cargar la información de los estudiantes");
        }
      });
    },

    exportarDatos: function () {
      this.$store.dispatch("fetchExportarDatos").then((result) => {
        var link = document.createElement("a");
        link.download = result;
        link.href = `${process.env.VUE_APP_WEBSERVICE_URL}/descargar_archivo/${result}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    },

    doubleClick: function (event) {
      Bus.$emit("editar_estudiante", event.id);
    },

    formatoMiles(n) {
      // Example -> format number 1000000 to 1,234,567
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    verInfoEstudiante: function (id) {
      Bus.$emit("verEstudiante", id);
    },

    eliminarEstudiante: function (id) {
      Bus.$emit("eliminarEstudiante", id);
    },
  },

  created() {
    this.$store.dispatch("fetchObtenerEstudiantes").then((result) => {
      if (result.CODIGO == 1) {
        this.filas = result.DATOS;
      }
    });
  },

  computed: {
    rows() {
      return this.filas.length;
    },

    filasFiltradas: function () {
      if (this.search !== "") {
        return this.filas.filter((element) => {
          return element.nombre_estudiante
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      }
      return this.filas;
    },
  },
};
</script>

<style lang="scss">
.input-login {
  width: 300px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>