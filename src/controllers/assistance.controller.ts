import { Request, Response } from 'express';
import { Assistance, AssistanceI } from '../models/Assistance';
import { NextFunction } from 'express';

export class AssistanceController {
    public async test(req: Request, res: Response): Promise<void> {
        try {
            res.send('hola, método test para Assistance');
        } catch (error) {
            res.status(500).send({ error: 'Error en el método test de Assistance' });
        }
    }

    public async getOneAssistance(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id: idParam } = req.params;
    
        try {
            const assistance: AssistanceI | null = await Assistance.findOne({
                where: { 
                    id: idParam,
                    isHidden: false // Asegúrate de incluir este filtro
                }
            });
    
            if (assistance) {
                res.status(200).json(assistance);
            } else {
                res.status(404).json({ msg: "La asistencia no existe o está oculta" });
            }
        } catch (error) {
            console.error('Error al obtener la asistencia:', error);
            res.status(500).json({ msg: "Error interno" });
        }
        next();
    }

    public async getAllAssistance(req: Request, res: Response): Promise<void> {
        try {
            const assistances: Assistance[] = await Assistance.findAll({
                where: { isHidden: false }
            });
    
            res.status(200).json({ assistance: assistances });
        } catch (error) {
            console.error('Error al obtener todas las asistencias:', error);
            res.status(500).json({ msg: "Error al obtener las asistencias" });
        }
    }

    public async createAssistance(req: Request, res: Response): Promise<void> {
        const { fechaAsistencia, descripcion, empleadoId } = req.body;
        try {
            const assistance: AssistanceI = await Assistance.create({ 
                fechaAsistencia, 
                descripcion, 
                empleadoId 
            });
            res.status(201).json({ assistance });
        } catch (error) {
            res.status(500).send({ error: 'Error al crear la asistencia' });
        }
    }

    public async updateAssistance(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        const { fechaAsistencia, descripcion, empleadoId } = req.body;

        try {
            const assistanceExist: AssistanceI | null = await Assistance.findByPk(pk);
            if (!assistanceExist) {
                res.status(404).json({ msg: "La asistencia no existe, no se puede actualizar" });
                return;
            }

            await Assistance.update(
                { fechaAsistencia, descripcion, empleadoId },
                { where: { id: pk } }
            );

            const updatedAssistance: AssistanceI | null = await Assistance.findByPk(pk);
            if (updatedAssistance) {
                res.status(200).json({ assistance: updatedAssistance });
            } else {
                res.status(500).json({ msg: "Error al actualizar la asistencia" });
            }
        } catch (error) {
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async deleteAssistance(req: Request, res: Response): Promise<void> {
        const { id: pk } = req.params;
        try {
            const assistanceExist: AssistanceI | null = await Assistance.findByPk(pk);
            if (!assistanceExist) {
                res.status(404).json({ msg: "La asistencia no existe, no se puede eliminar" });
                return;
            }

            await Assistance.destroy({ where: { id: pk } });
            res.status(200).json({ msg: "Asistencia eliminada" });
        } catch (error) {
            res.status(500).json({ msg: "Error interno" });
        }
    }

    public async hideAssistance(req: Request, res: Response): Promise<void> {
        const assistanceId = req.params.id;
        console.log(`Ejecutando hideAssistance para el ID: ${assistanceId}`);
  
        try {
            const assistance = await Assistance.findByPk(assistanceId);
    
            if (!assistance) {
                res.status(404).json({ message: 'Asistencia no se puede ocultar, no existe' });
            } else {
                await assistance.update({ isHidden: true });
                res.json({
                    message: 'Asistencia oculta correctamente',
                    assistance: assistance
                });
            }
        } catch (error: any) {
            console.error('Error en hideAssistance:', error);
            res.status(500).json({
                message: 'Error al ocultar la asistencia',
                error: error.message
            });
        }
    }
}

