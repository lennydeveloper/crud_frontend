<template>
  <section>
    <b-modal size="lg" id="modal-editar" title="Editar Estudiante">
      <div class="d-flex">
        <input
          type="text"
          placeholder="NOMBRE"
          v-model="estudiante.nombre_estudiante"
          class="w-50 pl-2"
        />
        <input
          type="text"
          placeholder="DOCUMENTO"
          onkeypress="return event.keyCode >= 48 && event.keyCode <= 57"
          maxlength="10"
          v-model="estudiante.documento_estudiante"
          class="w-50 ml-2 pl-2"
        />
      </div>

      <div class="d-flex mt-3">
        <input
          type="text"
          placeholder="TELÉFONO"
          v-model="estudiante.telefono_estudiante"
          onkeypress="return event.keyCode >= 48 && event.keyCode <= 57"
          maxlength="10"
          class="w-50 pl-2"
        />
        <input
          type="email"
          placeholder="CORREO"
          v-model="estudiante.correo_estudiante"
          class="w-50 pl-2 ml-2"
        />
      </div>

      <div class="d-flex mt-3">
        <input
          type="text"
          placeholder="COD CERTIFICADO"
          v-model="estudiante.codigo"
          class="w-50 pl-2"
        />
        <b-form-select
          class="w-50 ml-2"
          v-model="estudiante.curso_id"
          :options="listado_cursos"
        ></b-form-select>
      </div>

      <div class="d-flex mt-3 align-items-center">
        <b-form-datepicker
          id="example-datepicker"
          class="w-50"
          v-model="estudiante.fecha_realizacion"
        ></b-form-datepicker>

        <p class="m-0 p-0 w-50 text-center">{{ estudiante.estado }}</p>
      </div>

      <template #modal-footer="{ cancel }">
        <button class="btn btn-primary border" @click="editarEstudiante">
          ACEPTAR
        </button>
        <button class="btn border" @click="cancel()">CANCELAR</button>
      </template>
    </b-modal>
  </section>
</template>

<script>
import Bus from "@/helper/bus.js";
export default {
  name: "editarEstudiante",
  components: {},
  data() {
    return {
      estudiante: {
        id: null,
        nombre_estudiante: "",
        documento_estudiante: "",
        telefono_estudiante: "",
        correo_estudiante: "",
        codigo: "",
        curso_id: null,
        fecha_realizacion: "",
        estado: null,
      },
      listado_cursos: [],
    };
  },

  mounted() {
    Bus.$on("editar_estudiante", (id) => {
      this.$store
        .dispatch("fetchObtenerDetalleEstudiante", { estudiante_id: id })
        .then((result) => {
          this.estudiante = result.DATOS;
          this.$root.$emit("bv::show::modal", "modal-editar");
        });
    });
  },

  computed: {},

  created() {
    this.$store.dispatch("fetchObtenerTiposDocumento").then((result) => {
      this.opciones_tipo_documento = result.DATOS;
      this.opciones_tipo_documento.unshift({
        value: null,
        text: "Tipo de documento",
      });
    }),
      this.$store.dispatch("fetchObtenerCursos").then((result) => {
        this.listado_cursos = result.DATOS;
        this.listado_cursos.unshift({ value: null, text: "Curso realizado" });
      });
  },

  methods: {
    editarEstudiante: function () {
      const payload = {
        id: this.estudiante.id,
        nombre: this.estudiante.nombre_estudiante,
        documento: this.estudiante.documento_estudiante,
        tipo_documento_id: this.estudiante.tipo_documento,
        telefono: this.estudiante.telefono_estudiante,
        correo: this.estudiante.correo_estudiante,
        cod_cert: this.estudiante.codigo,
        curso_id: this.estudiante.curso_id,
        fecha_realizacion: this.estudiante.fecha_realizacion,
      };
      this.$store.dispatch("fetchEditarEstudiante", payload).then((result) => {
        if (result.CODIGO == 1) {
          alert("Estudiante editado exitosamente");
          this.$router.go(0);
        } else {
          alert(result.MENSAJE);
        }
      });
      this.resetModal()
      this.cerrarModal("modal-editar");
    },

    cerrarModal: function (id) {
      this.$root.$emit("bv::hide::modal", id);
    },

    resetModal: function () {
      this.estudiante = {
        id: null,
        nombre_estudiante: "",
        documento_estudiante: "",
        telefono_estudiante: "",
        correo_estudiante: "",
        codigo: "",
        curso_id: null,
        fecha_realizacion: "",
        estado: null,
      };
    },
  },
};
</script>

<style lang="scss">
</style>
