//src/public/js/functions/datatableFunctions.ts
import DataTable from 'datatables.net-bm';
import jszip from 'jszip';
import 'datatables.net-autofill-bm';
import 'datatables.net-buttons-bm';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import 'datatables.net-colreorder-bm';
import 'datatables.net-responsive-bm';
import 'datatables.net-rowreorder-bm';
import 'datatables.net-select-bm';

import 'datatables.net-bm/css/dataTables.bulma.css';
import 'datatables.net-autofill-bm/css/autoFill.bulma.css'
import 'datatables.net-buttons-bm/css/buttons.bulma.css'
import 'datatables.net-colreorder-bm/css/colReorder.bulma.css' 
import 'datatables.net-responsive-bm/css/responsive.bulma.css'
import 'datatables.net-rowreorder-bm/css/rowReorder.bulma.css'
import 'datatables.net-select-bm/css/select.bulma.css'

import '../../css/template/dataTables.scss';

import { CustomError } from '../../../helpers/errorManager';
import { showToastError } from '../../../helpers/showToast';
import { fetchWithAxios } from '../../../helpers/axiosHelpers'

DataTable.Buttons.jszip(jszip);

// Configuración específica para las extensiones
const opcionesDataTables = {
  dom: '<"top"lf>rt<"bottom-left"B><"bottom-right"pi><"clear">',// Indica la disposición de los elementos de la tabla
  // Configuración de la extensión Buttons
  buttons: [
    {
      extend: 'copy',
      text: '<i class="far fa-copy"></i>',
      titleAttr: 'Copiar'
    },
    {
      extend: 'csv',
      filename: 'dataTables',
      text: '<i class="fas fa-file-csv"></i>',
      titleAttr: 'CSV'
    },
    {
      extend: 'excel',
      text: '<i class="fas fa-file-excel"></i>',
      titleAttr: 'Excel'
    },
    {
      extend: 'print',
      text: '<i class="fas fa-print"></i>',
      titleAttr: 'Imprimir'
    }
  ]
};

//Armo funcion para inicializar DataTables:
export const inicializarDataTables = () => {

  const tableElement = document.querySelector<HTMLTableElement>('#miTabla');
  if (!tableElement) throw new Error('Tabla no encontrada');

  const table = new DataTable('#miTabla', {
    // Incluye la configuración extendida
    ...opcionesDataTables,
    responsive: true,
    select: true,
    rowReorder: true,
    colReorder: true,
    autoFill: true,
    stateSave: true
  });

  
  const toggleReorderFeatures = (enable: boolean) => {
    if (enable) {
      if (table.rowReorder) table.rowReorder.enable();
      if (table.colReorder) table.colReorder.enable();
    } else {
      if (table.rowReorder) table.rowReorder.disable();
      if (table.colReorder) table.colReorder.disable();
    }
  };

  const checkScreenSize = () => {
    const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;
    toggleReorderFeatures(isLargeScreen);
  };

  // Ejecuta la función al cargar la página
  checkScreenSize();

  // Añade el evento de escucha para cambios de tamaño de la ventana
  window.addEventListener('resize', checkScreenSize);

};


// Agrego el listener al DOM:
document.addEventListener('DOMContentLoaded', () => {

  // Defino los elementos del DOM donde se va a renderizar la tabla:
  const tabs = document.querySelectorAll('.tabs li');
  const dataTableButton = document.getElementById('traerDataTable');
  const dataTableContainer = document.getElementById('dataTableContainer');
  const header = document.querySelector('.header') as HTMLElement | null; // Agrega '| null' para manejar posibles valores nulos

  // Asegura que el primer tab está activo y que dataTableButton no es null
  if (tabs.length > 0 && dataTableButton) {
    const firstTab = tabs[0];
    const isActive = firstTab.classList.contains('is-active');
    const apiRoute = firstTab.getAttribute('data-api') || 'default-route'; // Asigna un valor predeterminado si es null

    // Si el primer tab no está activo, actívalo
    if (!isActive) {
      firstTab.classList.add('is-active');
    }

    // Establece el valor de 'data-api' en el botón
    dataTableButton.setAttribute('data-api', apiRoute);
  }

  if (dataTableButton && dataTableContainer) {
    tabs.forEach(tab => {
      tab.addEventListener('click', function(event) {
        // Aquí no necesitas el casting ya que currentTarget siempre será un HTMLElement en este contexto
        const clickedTab = event.currentTarget;
        if (!(clickedTab instanceof HTMLElement)) {
          console.error('El elemento clickeado no es un HTMLElement');
          return;
        }
        
        const apiRoute = clickedTab.getAttribute('data-api');

        if (apiRoute) {
          dataTableButton.setAttribute('data-api', apiRoute);

          // Actualiza el estilo de las solapas
          tabs.forEach(t => t.classList.remove('is-active'));
          clickedTab.classList.add('is-active');
        } else {
          console.error('API route not found for the clicked tab');
        }
      });
    });

    dataTableButton.addEventListener('click', async () => {
      const apiRoute = dataTableButton.getAttribute('data-api') || 'default-route'; // Maneja un valor nulo con un valor predeterminado
      try {
        const response = await fetchWithAxios(`/dataTable?tab=${apiRoute}`);
        dataTableContainer.innerHTML = response;

        // Ahora inicializa DataTables
        inicializarDataTables();

        // Oculta el header si no es nulo
        if (header) {
          header.style.display = 'none';
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        dataTableContainer.innerHTML = 'Error al cargar los datos';
        // Suponiendo que CustomError y showToastError están definidos en otro lugar
        const customError = CustomError.fromError(error);
        customError.logError();
        showToastError(customError);
      }
    });
  }
});
