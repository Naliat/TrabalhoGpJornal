import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Info,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from "lucide-react";

import styles from "./EventDetails.module.css";
import { eventsMock } from "../../../mocks/event";
import { formatEventDateRange } from "../utils/formatEventDateRange";

function EventDetails() {
  const { id } = useParams();

  const event = eventsMock.find(
    (item) => item.id === Number(id)
  );

  if (!event) {
    return (
      <p className={styles.notFound}>
        Evento não encontrado.
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/eventos" className={styles.backLink}>
          ← Voltar para eventos
        </Link>

        <h1 className={styles.title}>{event.titulo}</h1>
        <p className={styles.headerDescription}>
          {event.subtitulo}
        </p>
      </header>

      <div className={styles.mainGrid}>
        <section className={styles.leftColumn}>
          <img
            src={event.image}
            alt={event.titulo}
            className={styles.image}
          />

          <div className={styles.infoBox}>
            <h3>Informações do Evento</h3>

            <ul className={styles.infoList}>
              <li>
                <Calendar size={16} />
                <div>
                  <strong>Data</strong>
                  <span>
                    {formatEventDateRange(
                      event.dataInicio,
                      event.dataFim
                    )}
                  </span>
                </div>
              </li>

              <li>
                <Clock size={16} />
                <div>
                  <strong>Horário</strong>
                  <span>{event.horario}</span>
                </div>
              </li>

              <li>
                <MapPin size={16} />
                <div>
                  <strong>Local</strong>
                  <span>{event.local}</span>
                </div>
              </li>

              <li>
                <Users size={16} />
                <div>
                  <strong>Vagas</strong>
                  <span>{event.totalVagas} vagas totais</span>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.contentBox}>
            <h3>Sobre o Evento</h3>
            <p>{event.sobre}</p>

            <h3>Programação</h3>
            <ul className={styles.iconList}>
              {event.programacao.map((item, index) => (
                <li key={index}>
                  <CheckCircle size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3>Requisitos e Observações</h3>
            <ul className={styles.iconListWarning}>
              {event.requisitosObservacoes.map((item, index) => (
                <li key={index}>
                  <AlertCircle size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className={styles.rightColumn}>
          <div className={styles.sideBox}>
            <h3>
              <Info size={18} />
              Organizador
            </h3>

            <p>{event.organizador}</p>

            <div className={styles.contact}>
              <Mail size={16} />
              <span>{event.emailContato}</span>
            </div>

            <div className={styles.contact}>
              <Phone size={16} />
              <span>{event.telefoneContato}</span>
            </div>

            <button className={styles.primaryButton}>
              Ir para o link de Inscrição
            </button>
          </div>

          <div className={styles.tipsBox}>
            <strong>Dicas para o Evento</strong>
            <ul className={styles.tipsList}>
              <li>
                <Clock size={16} />
                <span>Chegue com 15 minutos de antecedência</span>
              </li>
              <li>
                <Info size={16} />
                <span>Traga documento de identificação</span>
              </li>
              <li>
                <Mail size={16} />
                <span>Confirme sua presença pelo email</span>
              </li>
              <li>
                <Lightbulb size={16} />
                <span>Materiais serão fornecidos no local</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default EventDetails;
