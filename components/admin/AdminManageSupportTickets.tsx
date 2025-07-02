import React, { useState } from 'react';
import { SimulatedTicket, TicketStatus, TICKET_SUBJECTS_PT, TICKET_STATUS_PT } from '../../types';

interface AdminManageSupportTicketsProps {
  tickets: SimulatedTicket[];
}

export const AdminManageSupportTickets: React.FC<AdminManageSupportTicketsProps> = ({ tickets: initialTickets }) => {
  const [tickets, setTickets] = useState<SimulatedTicket[]>(initialTickets.sort((a,b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');
  const [viewingTicket, setViewingTicket] = useState<SimulatedTicket | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFilterStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value as TicketStatus | 'all');
  };

  const filteredTickets = tickets
    .filter(ticket => {
        const subjectText = TICKET_SUBJECTS_PT[ticket.subject] || ticket.subject;
        return (
            ticket.id.toLowerCase().includes(searchTerm) ||
            ticket.name.toLowerCase().includes(searchTerm) ||
            ticket.email.toLowerCase().includes(searchTerm) ||
            subjectText.toLowerCase().includes(searchTerm) ||
            ticket.description.toLowerCase().includes(searchTerm)
        );
    })
    .filter(ticket => filterStatus === 'all' || ticket.status === filterStatus);

  const handleViewTicket = (ticket: SimulatedTicket) => {
    setViewingTicket(ticket);
  };

  const handleCloseTicketModal = () => {
    setViewingTicket(null);
  };

  const handleUpdateTicketStatus = (ticketId: string, newStatus: TicketStatus) => {
    console.log(`Admin: Update Ticket Status for ${ticketId} to ${newStatus} (Simulated)`);
    alert(`Atualizar status do chamado ${ticketId} para ${TICKET_STATUS_PT[newStatus]} (Simulado). A lista não será atualizada sem backend.`);
    // API Call simulation
    // setTickets(prevTickets => prevTickets.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    if (viewingTicket && viewingTicket.id === ticketId) {
      setViewingTicket(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Chamados de Suporte</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por ID, nome, email, assunto..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">Todos os Status</option>
          {Object.keys(TICKET_STATUS_PT).map(statusKey => (
            <option key={statusKey} value={statusKey}>{TICKET_STATUS_PT[statusKey as TicketStatus]}</option>
          ))}
        </select>
      </div>

      {filteredTickets.length === 0 && (searchTerm || filterStatus !== 'all') ? (
         <p className="text-gray-600 text-center py-4">Nenhum chamado encontrado para os filtros aplicados.</p>
      ) : paginatedTickets.length === 0 && !searchTerm && filterStatus === 'all' ? (
         <p className="text-gray-600 text-center py-4">Não há chamados de suporte registrados.</p>
      ) : (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assunto</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedTickets.map(ticket => (
                        <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{ticket.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate" title={TICKET_SUBJECTS_PT[ticket.subject] || String(ticket.subject)}>
                            {TICKET_SUBJECTS_PT[ticket.subject] || String(ticket.subject)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(ticket.submittedDate)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${ticket.status === 'open' ? 'bg-red-100 text-red-800' : 
                                ticket.status === 'pending_reply' ? 'bg-yellow-100 text-yellow-800' :
                                ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' : ''}`}>
                            {TICKET_STATUS_PT[ticket.status] || ticket.status}
                            </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleViewTicket(ticket)} className="text-blue-600 hover:text-blue-900 mr-3 transition-colors">
                            <i className="fas fa-eye mr-1"></i> Ver
                            </button>
                            {/* Simplified status update for demo */}
                            {ticket.status === 'open' && (
                                <button onClick={() => handleUpdateTicketStatus(ticket.id, 'pending_reply')} className="text-yellow-600 hover:text-yellow-900 transition-colors">
                                <i className="fas fa-hourglass-half mr-1"></i> Responder
                                </button>
                            )}
                            {ticket.status === 'pending_reply' && (
                                <button onClick={() => handleUpdateTicketStatus(ticket.id, 'resolved')} className="text-green-600 hover:text-green-900 transition-colors">
                                <i className="fas fa-check-circle mr-1"></i> Resolver
                                </button>
                            )}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="mt-6 flex justify-center items-center space-x-2">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50">Anterior</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} onClick={() => handlePageChange(page)} className={`px-3 py-1 border rounded-md text-sm ${currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 hover:bg-gray-100'}`}>{page}</button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50">Próxima</button>
                </div>
            )}
        </>
      )}

      {viewingTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={handleCloseTicketModal} role="dialog" aria-modal="true" aria-labelledby="ticket-detail-title">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 id="ticket-detail-title" className="text-xl font-semibold text-gray-800">Detalhes do Chamado #{viewingTicket.id}</h3>
              <button onClick={handleCloseTicketModal} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times"></i></button>
            </div>
            <div className="space-y-3 text-sm">
              <p><strong>Nome:</strong> {viewingTicket.name}</p>
              <p><strong>Email:</strong> <a href={`mailto:${viewingTicket.email}`} className="text-blue-600 hover:underline">{viewingTicket.email}</a></p>
              <p><strong>Assunto:</strong> {TICKET_SUBJECTS_PT[viewingTicket.subject]}</p>
              <p><strong>Data:</strong> {formatDate(viewingTicket.submittedDate)}</p>
              <p><strong>Status Atual:</strong> <span className={`font-semibold ${viewingTicket.status === 'open' ? 'text-red-600' : viewingTicket.status === 'pending_reply' ? 'text-yellow-600' : viewingTicket.status === 'resolved' ? 'text-green-600' : 'text-gray-600'}`}>{TICKET_STATUS_PT[viewingTicket.status]}</span></p>
              <div className="border-t pt-3 mt-3">
                <p className="font-semibold mb-1">Descrição:</p>
                <p className="whitespace-pre-wrap bg-gray-50 p-3 rounded-md">{viewingTicket.description}</p>
              </div>
              {viewingTicket.attachment && (
                <p><strong>Anexo:</strong> {typeof viewingTicket.attachment === 'string' ? viewingTicket.attachment : (viewingTicket.attachment as File).name} (Simulação)</p>
              )}
            </div>
            <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row gap-2 justify-end">
                <select 
                    value={viewingTicket.status} 
                    onChange={(e) => handleUpdateTicketStatus(viewingTicket.id, e.target.value as TicketStatus)}
                    className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                    {Object.keys(TICKET_STATUS_PT).map(s => (
                        <option key={s} value={s}>{TICKET_STATUS_PT[s as TicketStatus]}</option>
                    ))}
                </select>
                <button onClick={handleCloseTicketModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};