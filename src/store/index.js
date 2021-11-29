import Vue from "vue";
import Vuex from "vuex";
import http from "@/api/";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    fetchIniciarSesion: ({ commit }, payload) => {
      return http.post("iniciar_sesion", payload).then(result => {
        return result;
      });
    },

    fetchObtenerEstudiantes: ({ commit }) => {
      return http.get("obtener_estudiantes").then(result => {
        return result;
      });
    },

    fetchObtenerCursos: ({ commit }) => {
      return http.get("cursos_obtener").then(result => {
        return result;
      });
    },

    fetchObtenerTiposDocumento: ({ commit }) => {
      return http.get("tipos_documento_obtener").then(result => {
        return result;
      });
    },

    fetchAgregarEstudiante: ({ commit }, payload) => {
      return http.put("estudiante_crear", payload).then(result => {
        return result;
      });
    },

    fetchEditarEstudiante: ({ commit }, payload) => {
      return http.put("estudiante_editar", payload).then(result => {
        return result;
      });
    },

    fetchObtenerDetalleEstudiante: ({ commit }, payload) => {
      return http.post("detalle_estudiante_obtener", payload).then(result => {
        return result;
      });
    },

    fetchConsultarEstudiante: ({ commit }, payload) => {
      return http.post("consultar_estudiante", payload).then(result => {
        return result;
      });
    },

    fetchInformacionEstudiante: ({ commit }, payload) => {
      return http.post("informacion_estudiante", payload).then(result => {
        return result;
      });
    },

    fetchExportarDatos: ({ commit }) => {
      return http.get("exportar_excel").then(result => {
        return result;
      });
    },

    fetchEliminarEstudiante: ({ commit }, payload) => {
      return http.delete("estudiante_eliminar", payload).then(result => {
        return result;
      });
    },

    fetchNotificarUsuarios: ({ commit }, payload) => {
      return http.post("enviar_alerta_vencimiento", payload).then(result => {
        return result;
      });
    }
  },
  modules: {}
});
