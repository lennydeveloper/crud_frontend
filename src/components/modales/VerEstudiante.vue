<template>
  <section>
    <b-modal size="lg" id="modal-detalle" title="Ver Estudiante">
      <div class="d-flex">
        <input
          :disabled="true"
          type="text"
          placeholder="NOMBRE"
          v-model="nombre"
          class="w-50 pl-2"
        />

        <input
          :disabled="true"
          type="text"
          placeholder="DOCUMENTO"
          onkeypress="return event.keyCode >= 48 && event.keyCode <= 57"
          maxlength="10"
          v-model="documento"
          class="w-50 ml-2 pl-2"
        />
      </div>

      <div class="d-flex mt-3">
        <!-- <b-form-select
          :disabled="true"
          class="w-50"
          v-model="tipo_documento"
          :options="opciones_tipo_documento"
        ></b-form-select> -->
        <input
          :disabled="true"
          type="text"
          placeholder="TELÉFONO"
          v-model="telefono"
          onkeypress="return event.keyCode >= 48 && event.keyCode <= 57"
          maxlength="10"
          class="w-50 ml-2 pl-2"
        />

        <input
          :disabled="true"
          type="email"
          placeholder="CORREO"
          v-model="correo"
          class="w-50 ml-2 pl-2"
        />
      </div>

      <div class="d-flex mt-3">
        <input
          :disabled="true"
          type="text"
          placeholder="COD CERTIFICADO"
          v-model="cod_cert"
          class="w-50 ml-2 pl-2"
        />

        <b-form-select
          :disabled="true"
          class="w-50 ml-2"
          v-model="curso_id"
          :options="listado_cursos"
        ></b-form-select>
      </div>

      <div class="d-flex mt-3">
        <b-form-datepicker
          :disabled="true"
          id="example-datepicker"
          class="w-50"
          v-model="fecha_realizacion"
        ></b-form-datepicker>

        <input
          :disabled="true"
          type="text"
          placeholder="ESTADO"
          v-model="estado"
          class="w-50 ml-2 pl-2"
        />
      </div>

      <div class="d-flex mt-3">
          <b-form-datepicker
          :disabled="true"
          id="example-datepicker2"
          class="w-50"
          v-model="fecha_vencimiento"
        ></b-form-datepicker>
      </div>

      <template #modal-footer="{ cancel }">
        <button class="btn border" @click="cancel()">CERRAR</button>
      </template>
    </b-modal>
  </section>
</template>

<script>
import Bus from "@/helper/bus.js";
export default {
  name: "verEstudiante",
  components: {},
  data() {
    return {
      nombre: "",
      telefono: "",
      correo: "",
      documento: "",
      cod_cert: "",
      tipo_documento: null,
      opciones_tipo_documento: [],
      curso_id: null,
      listado_cursos: [],
      fecha_realizacion: "",
      fecha_vencimiento: "",
      estado: "",
    };
  },

  mounted() {
    Bus.$on("verEstudiante", (id) => {
      this.$store
        .dispatch("fetchInformacionEstudiante", { id: id })
        .then((result) => {
          if (result.CODIGO == 1) {
            let data = result.DATOS;
            this.nombre = data.nombre;
            this.telefono = data.telefono;
            this.correo = data.correo;
            this.documento = data.documento;
            this.cod_cert = data.cod_cert;
            this.tipo_documento = data.tipo_documento;
            this.curso_id = data.curso_id;
            this.fecha_realizacion = data.fecha_realizacion;
            this.fecha_vencimiento = data.fecha_vencimiento;
            this.estado = data.estado;
            // show modal
            this.$root.$emit("bv::show::modal", "modal-detalle");
          } else {
            alert(result.MENSAJE);
          }
        });
    });
  },

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
    cerrarModal: function (id) {
      this.$root.$emit("bv::hide::modal", id);
    },

    resetModal: function () {
      this.nombre = "";
      this.telefono = "";
      this.correo = "";
      this.documento = "";
      this.cod_cert = "";
      this.tipo_documento = null;
      this.curso_id = null;
      this.fecha_realizacion = "";
      this.fecha_vencimiento = "";
      this.estado = "";
    },
  },
};
</script>

<style lang="scss">
</style>
