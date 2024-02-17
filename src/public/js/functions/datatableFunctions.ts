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

DataTable.Buttons.jszip(jszip);

// Luego, en tu script principal donde inicializas DataTables:
document.addEventListener('DOMContentLoaded', function() {

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
});