
// Menus del modulo del turistaistrador
export const menus = [
    "Renta de autos", 
    "Hoteles", 
    "Vuelos", 
 ]
 
// Rutas del menu del modulo de turistaistracion 
export const sidebarItems = [
    {
      title: '🛫 Aerolinea',
      itemId: '/turista/vuelo',
      subNav: [
        {
          title: 'Listar',
          itemId: '/turista/vuelo/list',
        }
      ],
    },
    {
      title: '🏬 Hotel',
      itemId: '/turista/hotel',
      subNav: [
        {
          title: 'Listar',
          itemId: '/turista/hotel/list',
        }
      ],
    },
    {
      title: '🚗 Renta de Autos',
      itemId: '/turista/vehiculos',
      subNav: [
        {
          title: 'Listar',
          itemId: '/turista/vehiculos/list',
        }
      ],
    },
    {
      title: '📨 Reseñas',
      itemId: '/turista/reseña',
      subNav: [
        {
          title: 'Realizar',
          itemId: '/turista/reseña/add',
        },
        {
          title: 'Listar',
          itemId: '/turista/reseña/list',
        }
      ],
    },

  ]
