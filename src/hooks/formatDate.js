
export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const dayOfWeek = daysOfWeek[date.getDay()]

    return `${day} ${month} ${year} - ${dayOfWeek}`
}