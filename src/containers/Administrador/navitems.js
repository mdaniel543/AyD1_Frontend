
// Menus del modulo del administrador
export const menus = [
    "Usuarios", 
    "Renta de autos", 
    "Hoteles", 
    "Vuelos", 
 ]
 
// Rutas del menu del modulo de administracion 
export const sidebarItems = [
    {
      title: '🛫 Aerolinea',
      itemId: '/admin/vuelo',
      subNav: [
        {
          title: 'Crear ',
          itemId: '/admin/vuelo/add',
        },
        {
          title: 'Listar',
          itemId: '/admin/vuelo/list',
        }
      ],
    },
    {
      title: '🏬 Hotel',
      itemId: '/admin/hotel',
      subNav: [
        {
          title: 'Crear ',
          itemId: '/admin/hotel/add',
        },
        {
          title: 'Listar',
          itemId: '/admin/hotel/list',
        }
      ],
    },
    {
      title: '🚗 Renta de Autos',
      itemId: '/admin/vehiculos',
      subNav: [
        {
          title: 'Crear ',
          itemId: '/admin/vehiculos/add',
        },
        {
          title: 'Listar',
          itemId: '/admin/vehiculos/list',
        }
      ],
    },

  ]
