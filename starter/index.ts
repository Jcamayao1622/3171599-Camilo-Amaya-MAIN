// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// DOMINIO: Plataforma de Maquinaria Agrícola (Agrotech)
// ============================================

console.log('🚜 PROYECTO SEMANAL: AGROTECH - MODELADO DE ENTIDADES\n');

// ============================================
// 1. Define las entidades principales de tu dominio
// ============================================

// QUÉ: Define categorías permitidas para maquinaria agrícola
// PARA: Controlar valores válidos y evitar errores por texto libre
// IMPACTO: Datos consistentes en todo el sistema
type MachineCategory = 'TRACTOR' | 'HARVESTER' | 'SPRAYER' | 'PLOW';

// QUÉ: Define los estados posibles de una maquinaria en la plataforma
// PARA: Modelar el ciclo de vida de disponibilidad
// IMPACTO: Permite filtrar y validar operaciones (ej: no alquilar si está en mantenimiento)
type MachineStatus = 'AVAILABLE' | 'RENTED' | 'MAINTENANCE' | 'INACTIVE';

// QUÉ: Define roles de usuario dentro del sistema Agrotech
// PARA: Simular control de permisos por tipo de usuario
// IMPACTO: Facilita escalabilidad del sistema (admins vs clientes)
type UserRole = 'FARMER' | 'COMPANY' | 'ADMIN';

// TODO: Define una interface para la entidad principal
interface Machine {
  id: string;
  name: string;
  category: MachineCategory;
  status: MachineStatus;
  dailyPrice: number;
  year: number;
}

// TODO: Define al menos otra interface relacionada
interface Rental {
  rentalId: string;
  machineId: string;
  customerName: string;
  days: number;
  startDate: string;
}

// QUÉ: Define la estructura de usuario de la plataforma
// PARA: Tener una entidad relacionada al uso del sistema
// IMPACTO: Permite vincular maquinaria y alquileres a personas/empresas
interface User {
  id: string;
  name: string;
  role: UserRole;
}

// ============================================
// 2. Usa type unions y literales para propiedades clave
// ============================================

// QUÉ: Literal para limitar métodos de pago
// PARA: Validar que solo existan métodos permitidos
// IMPACTO: Reduce errores de datos en pagos futuros
type PaymentMethod = 'CASH' | 'CARD' | 'TRANSFER';

// ============================================
// 3. Implementa funciones tipadas para operaciones básicas
// ============================================

// QUÉ: Tipo auxiliar para crear maquinaria sin pasar manualmente el ID
// PARA: Evitar que el usuario del sistema tenga que generar IDs
// IMPACTO: Mejora la experiencia y reduce errores humanos
type CreateMachineDTO = Omit<Machine, 'id'>;

// QUÉ: Genera un ID simple basado en timestamp
// PARA: Simular identificadores únicos sin base de datos
// IMPACTO: Permite crear múltiples registros sin colisión fácil
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}`;
}

// TODO: Implementa una función que cree una entidad
function createMachine(data: CreateMachineDTO): Machine {
  return {
    id: generateId('MCH'),
    ...data,
  };
}

// TODO: Implementa una función que liste entidades
function listMachines(machines: Machine[]): Machine[] {
  return machines;
}

// TODO: Implementa una función que filtre entidades por status/categoría
function filterMachinesByStatus(machines: Machine[], status: MachineStatus): Machine[] {
  return machines.filter((machine) => machine.status === status);
}

// QUÉ: Filtra maquinaria por categoría
// PARA: Permitir búsqueda por tipo de maquinaria agrícola
// IMPACTO: Mejora organización y clasificación en el sistema
function filterMachinesByCategory(machines: Machine[], category: MachineCategory): Machine[] {
  return machines.filter((machine) => machine.category === category);
}

// QUÉ: Calcula el costo total de un alquiler
// PARA: Generar costos automáticamente según días y tarifa diaria
// IMPACTO: Permite cotización rápida sin cálculos manuales
function calculateRentalCost(days: number, dailyPrice: number, discount: number = 0): number {
  return days * dailyPrice * (1 - discount);
}

// ============================================
// 4. Uso de Generics y Utility Types
// ============================================

// QUÉ: Respuesta estándar reutilizable para operaciones del sistema
// PARA: Aplicar generics para reutilizar la estructura con cualquier entidad
// IMPACTO: Código más escalable y reutilizable
type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

function createResponse<T>(data: T, message: string): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

// QUÉ: Utility type para actualizar maquinaria parcialmente
// PARA: Permitir actualizar solo algunos campos (ej: status o price)
// IMPACTO: Reduce necesidad de reescribir todo el objeto
type MachineUpdate = Partial<Machine>;

// QUÉ: Utility type para mostrar un resumen de maquinaria
// PARA: Crear un preview para listados
// IMPACTO: Reduce información innecesaria en listados
type MachinePreview = Pick<Machine, 'id' | 'name' | 'dailyPrice' | 'status'>;

// QUÉ: Registro por categoría
// PARA: Agrupar maquinaria en un diccionario por categoría
// IMPACTO: Facilita reportes rápidos
type MachinesByCategory = Record<MachineCategory, Machine[]>;

// QUÉ: Convierte una lista de máquinas en previews
// PARA: Mostrar listados más limpios
// IMPACTO: Mejora legibilidad en consola o UI futura
function getMachinePreviews(machines: Machine[]): MachinePreview[] {
  return machines.map(({ id, name, dailyPrice, status }) => ({
    id,
    name,
    dailyPrice,
    status,
  }));
}

// QUÉ: Actualiza una máquina por ID
// PARA: Simular edición de maquinaria dentro del sistema
// IMPACTO: Permite cambiar estado, precio, etc. sin reconstruir objetos manualmente
function updateMachine(machines: Machine[], machineId: string, updates: MachineUpdate): Machine[] {
  return machines.map((machine) =>
    machine.id === machineId ? { ...machine, ...updates } : machine
  );
}

// QUÉ: Agrupa maquinaria por categoría usando Record
// PARA: Crear reportes por tipo de maquinaria
// IMPACTO: Facilita análisis rápido de inventario disponible
function groupMachinesByCategory(machines: Machine[]): MachinesByCategory {
  const grouped: MachinesByCategory = {
    TRACTOR: [],
    HARVESTER: [],
    SPRAYER: [],
    PLOW: [],
  };

  machines.forEach((machine) => {
    grouped[machine.category].push(machine);
  });

  return grouped;
}

// ============================================
// 5. Prueba tus funciones con datos de ejemplo
// ============================================

const machine1 = createMachine({
  name: 'John Deere 5050D',
  category: 'TRACTOR',
  status: 'AVAILABLE',
  dailyPrice: 250,
  year: 2021,
});

const machine2 = createMachine({
  name: 'Case IH Axial-Flow',
  category: 'HARVESTER',
  status: 'MAINTENANCE',
  dailyPrice: 600,
  year: 2019,
});

const machine3 = createMachine({
  name: 'Pulverizador AgriSpray X',
  category: 'SPRAYER',
  status: 'AVAILABLE',
  dailyPrice: 400,
  year: 2022,
});

let machines: Machine[] = [machine1, machine2, machine3];

console.log('📌 Lista completa de maquinaria:');
console.log(listMachines(machines));

console.log('\n📌 Filtrar maquinaria AVAILABLE:');
console.log(filterMachinesByStatus(machines, 'AVAILABLE'));

console.log('\n📌 Filtrar maquinaria por categoría TRACTOR:');
console.log(filterMachinesByCategory(machines, 'TRACTOR'));

console.log('\n📌 Previews de maquinaria:');
console.log(getMachinePreviews(machines));

console.log('\n📌 Agrupar maquinaria por categoría:');
console.log(groupMachinesByCategory(machines));

console.log('\n📌 Actualizar estado de una máquina (poner RENTED):');
machines = updateMachine(machines, machine1.id, { status: 'RENTED' });
console.log(machines);

console.log('\n📌 Calcular costo de alquiler:');
const totalCost = calculateRentalCost(5, machine1.dailyPrice, 0.1);
console.log(`Costo total por 5 días con 10% descuento: $${totalCost}`);

console.log('\n📌 Uso de Generics (respuesta estándar):');
console.log(createResponse(machine1, 'Máquina creada exitosamente'));

// QUÉ: Ejemplo de literal en método de pago
// PARA: Probar type literal en ejecución
// IMPACTO: Confirma validación de valores permitidos
const payment: PaymentMethod = 'TRANSFER';
console.log('\n📌 Método de pago seleccionado:', payment);

console.log('\n🚦 Recuerda: Adaptaste TODO al dominio Agrotech y comentaste el código.');
