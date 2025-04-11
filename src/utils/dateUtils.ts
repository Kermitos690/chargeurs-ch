
export const formatDate = (dateString: string, options: Intl.DateTimeFormatOptions = {}) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
};

export const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDuration = (startTime: string, endTime?: string) => {
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : new Date();
  const diffInMs = end.getTime() - start.getTime();
  
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}min`;
};
