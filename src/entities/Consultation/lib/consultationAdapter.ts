import { ConsultationDto } from '../api/consultationApi';
import { Consultation } from '../model/types';

export class ConsultationAdapter {
  static mapConsultationDtoToConsultation(dto: ConsultationDto):Consultation {
    return {
      id: dto.id,
      date: dto.created_at,
      consultant: dto.staff,
      format: dto.type,
      status: 'запланировано',
    };
  }
}
