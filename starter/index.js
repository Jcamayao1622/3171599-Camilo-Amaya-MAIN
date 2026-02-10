"use strict";
// ============================================
// PROYECTO SEMANAL: MODELADO DE ENTIDADES
// DOMINIO: Plataforma de Maquinaria Agrícola (Agrotech)
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
console.log('🚜 PROYECTO SEMANAL: AGROTECH - MODELADO DE ENTIDADES\n');
// QUÉ: Genera un ID simple basado en timestamp
// PARA: Simular identificadores únicos sin base de datos
// IMPACTO: Permite crear múltiples registros sin colisión fácil
function generateId(prefix) {
    return `${prefix}-${Date.now()}`;
}
// TODO: Implementa una función que cree una entidad
function createMachine(data) {
    return {
        id: generateId('MCH'),
        ...data,
    };
}
// TODO: Implementa una función que liste entidades
function listMachines(machines) {
    return machines;
}
// TODO: Implementa una función que filtre entidades por status/categoría
function filterMachinesByStatus(machines, status) {
    return machines.filter((machine) => machine.status === status);
}
// QUÉ: Filtra maquinaria por categoría
// PARA: Permitir búsqueda por tipo de maquinaria agrícola
// IMPACTO: Mejora organización y clasificación en el sistema
function filterMachinesByCategory(machines, category) {
    return machines.filter((machine) => machine.category === category);
}
// QUÉ: Calcula el costo total de un alquiler
// PARA: Generar costos automáticamente según días y tarifa diaria
// IMPACTO: Permite cotización rápida sin cálculos manuales
function calculateRentalCost(days, dailyPrice, discount = 0) {
    return days * dailyPrice * (1 - discount);
}
function createResponse(data, message) {
    return {
        success: true,
        message,
        data,
    };
}
// QUÉ: Convierte una lista de máquinas en previews
// PARA: Mostrar listados más limpios
// IMPACTO: Mejora legibilidad en consola o UI futura
function getMachinePreviews(machines) {
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
function updateMachine(machines, machineId, updates) {
    return machines.map((machine) => machine.id === machineId ? { ...machine, ...updates } : machine);
}
// QUÉ: Agrupa maquinaria por categoría usando Record
// PARA: Crear reportes por tipo de maquinaria
// IMPACTO: Facilita análisis rápido de inventario disponible
function groupMachinesByCategory(machines) {
    const grouped = {
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
let machines = [machine1, machine2, machine3];
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
const payment = 'TRANSFER';
console.log('\n📌 Método de pago seleccionado:', payment);
console.log('\n🚦 Recuerda: Adaptaste TODO al dominio Agrotech y comentaste el código.');
//# sourceMappingURL=index.js.map