# BankDashboard

La aplicación tiene tres componentes, las cuales son Login, Dashboard y Details:

Login
- Se puede acceder con cualquier nombre pero la contraseña debe ser 123456.
- El formulario valida campos vacios.
- El servicio valida que la contraseña sea 123456.
- Al loggearse el nombre del usuario se guarda en el sesionStorage con la key = username
simulando un token para realizar una validación con el SessionGuard.

Dashboard
- Se implementa grid layout para el manejo de las cards de acuerdo al tamaño de la pantalla,
maximo 4 cards por pantalla y va disminuyendo de acuerdo a la dimensión.
- El nombre que se muestra de bienvenida es dinamico y se obtiene del sessionStorage
- Tiene un header y un panel a la izquierda, sus funciones solo mostrarán un modal 
(SweetAlert) controlando el evento del click a excepción del Cerrar Sesión que muestra
un modal solicitando confirmación.
- Se muestra todos los productos en Cards y se puede filtrar por cualquier tipo de banco
gracias multiselect.
- Se hace el tratamiento a algunos datos mediante un switch de acuerdo al tipo de producto
con el fin de mostrar mensajes correspondientes o nombres de productos específicos.

Details
- Muestra de acuerdo al tipo de producto se muestran los detalles que trae el servicio.


La aplicación tiene dos servicios:

UserService
- Realiza el login, si es correcto (clave **123456** con algún nombre de usuario) 
devuelve un 200 si es incorrecto devuelve un 404.

ProductService
- Retorna los productos con un delay de 2000 milisengudos para ver un pequeño loading 
en el dashboard (simulando un comportamiento real), tomando la data enviada en un archivo
llamado **all-products-mocks.ts**.
- Tambien hace el set y get de productos e información generada a partir del producto 
seleccionado esto con el fin de no replicar código y para obtener fácilmente la información
del producto seleccionado en los detalles

Pruebas Unitarias
- Se comenta una prueba en dashboardComponent puesto que no funciona con el delay de 2000
milisegundos nombrado anteriormente con el fin de que se vea corriendo en local. Si se 
quita el delay y se descomenta la prueba, esta funcionara correctamente

- Se cubre el **94.32%** de código

Otros
- Toda la pagina tiene comportamiento responsive
- Las Cards, el panel y el header son componentes independientes
- La mayoría del texto se encuentra en constantes
- Se implementa un SessionGuard en la pantalla de Details y Dashboard que valida 
si se ha iniciado sesión revisando en el sessionStorage el item con key = username
- Se implementa bootstrap en todo el proyecto y angular material para el multiselect ya que
bootstrap no lo soporta.
- Se implementa SweetAlert para mostrar el modal de cerrar sesión y el de proximamente...
- En el archivo _grid.css se tiene los tamaños con los cuales se trabajará (igual que 
bootstrap) para el manejo de columnas

