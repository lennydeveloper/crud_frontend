<template>
  <section>
    <b-modal size="md" id="modal-borrar" title="Eliminar Estudiante">
      ¿Está seguro que desea eliminar este registro?
      <template #modal-footer="{ cancel }">
        <button class="btn btn-danger border" @click="borrarEstudiante()">
          ELIMINAR
        </button>
        <button class="btn border" @click="cancel()">CANCELAR</button>
      </template>
    </b-modal>
  </section>
</template>

<script>
import Bus from "@/helper/bus.js";
export default {
  name: "borrarEstudiante",
  components: {},
  data() {
    return {
      id: null,
    };
  },

  mounted() {
    Bus.$on("eliminarEstudiante", (id) => {
      this.id = id;
      this.$root.$emit("bv::show::modal", "modal-borrar");
    });
  },

  methods: {
    borrarEstudiante: function () {
      this.cerrarModal("modal-borrar");
      this.$store
        .dispatch("fetchEliminarEstudiante", { id: this.id })
        .then((result) => {
          if (result.status === 200) {
            alert("Estudiante eliminado exitosamente");
            this.$router.go(0);
          }
          this.id = null;
        })
        .catch((result) => {
          alert(result.data.MENSAJE);
        });
    },

    cerrarModal: function (id) {
      this.$root.$emit("bv::hide::modal", id);
    },
  },
};
</script>

<style lang="scss">
</style>
