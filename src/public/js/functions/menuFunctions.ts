//src/public/js/functions/menuFunctions.ts
// Función para manejar eventos de clic
export const handleClick = (body: HTMLBodyElement | null, sidebar: HTMLElement | null, event: MouseEvent): void => {
    event.preventDefault(); // Previene el comportamiento por defecto del evento
    // Lógica para manejar el clic
    sidebar?.classList.toggle('is-active');
    sidebar?.classList.remove('is-hidden');
    body?.classList.toggle('has-sidebar-active');
};