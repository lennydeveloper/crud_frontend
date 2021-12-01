<template>
  <section>
    <b-modal size="lg" id="modal-agregar" title="Agregar Estudiante">
      <div class="d-flex">
        <input
          type="text"
          placeholder="NOMBRE"
          v-model="nombre_est"
          class="w-50 pl-2"
        />
        <input
          type="text"
          placeholder="TELÉFONO"
          v-model="telefono_est"
          onkeypress="return event.keyCode >= 48 && event.keyCode <= 57"
          maxlength="10"
          class="w-50 ml-2 pl-2"
        />
      </div>

      <div class="d-flex mt-3">
        <b-form-select
          class="w-50"
          v-model="tipo_documento"
          :options="opciones_tipo_documento"
        ></b-form-select>
        <input
          type="text"
          placeholder="DOCUMENTO"
          onkeypress="return event.keyCode >= 48 && event.keyCode <= 57"
          maxlength="10"
          v-model="documento_est"
          class="w-50 ml-2 pl-2"
        />
      </div>

      <div class="d-flex mt-3">
        <input
          type="email"
          placeholder="CORREO"
          v-model="correo_est"
          class="w-50 pl-2"
        />
        <input
          type="text"
          placeholder="COD CERTIFICADO"
          v-model="codigo"
          class="w-50 ml-2 pl-2"
        />
      </div>

      <div class="d-flex mt-3">
        <b-form-select
          class="w-50"
          v-model="curso_id"
          :options="listado_cursos"
        ></b-form-select>
        <b-form-datepicker
          id="example-datepicker"
          class="w-50"
          v-model="fecha_realizacion"
        ></b-form-datepicker>
      </div>

      <template #modal-footer="{ cancel }">
        <button class="btn btn-primary border" @click="registrarEstudiante">
          ACEPTAR
        </button>
        <button class="btn border" @click="cancel()">CANCELAR</button>
      </template>
    </b-modal>
  </section>
</template>

<script>
import Bus from '@/helper/bus.js'
export default {
  name: 'agregarEstudiante',
  components: {},
  data () {
    return {
      nombre_est: '',
      telefono_est: '',
      correo_est: '',
      documento_est: '',
      codigo: '',
      tipo_documento: null,
      opciones_tipo_documento: [],
      curso_id: null,
      listado_cursos: [],
      fecha_realizacion: ''
    }
  },

  mounted () {},

  created () {
    this.$store.dispatch('fetchObtenerTiposDocumento').then((result) => {
      this.opciones_tipo_documento = result.DATOS
      this.opciones_tipo_documento.unshift({
        value: null,
        text: 'Tipo de documento'
      })
    }),
    this.$store.dispatch('fetchObtenerCursos').then((result) => {
      this.listado_cursos = result.DATOS
      this.listado_cursos.unshift({ value: null, text: 'Curso realizado' })
    })
  },

  methods: {
    registrarEstudiante: function () {
      const payload = {
        nombre: this.nombre_est,
        documento: this.documento_est,
        tipo_documento_id: this.tipo_documento,
        telefono: this.telefono_est,
        correo: this.correo_est,
        cod_cert: this.codigo,
        curso_id: this.curso_id,
        fecha_realizacion: this.fecha_realizacion
      }
      this.$store.dispatch('fetchAgregarEstudiante', payload).then((result) => {
        if (result.CODIGO === 1) {
          alert('Estudiante agregado exitosamente')
          Bus.$emit('actualizarDatos')
        } else {
          alert(result.MENSAJE)
        }
      })
      this.resetModal()
      this.cerrarModal('modal-agregar')
    },

    cerrarModal: function (id) {
      this.$root.$emit('bv::hide::modal', id)
    },

    resetModal: function () {
      this.nombre_est = ''
      this.telefono_est = ''
      this.correo_est = ''
      this.documento_est = ''
      this.codigo = ''
      this.tipo_documento = null
      this.curso_id = null
    }
  }
}
</script>

<style lang="scss">
</style>
