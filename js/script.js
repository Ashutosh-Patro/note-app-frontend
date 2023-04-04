async function fetchCards() {
    await fetch('http://localhost:8080/').then((data) => {
        return data.json();
    })
    // .then((res) => {
    //     experienceItem.forEach((item, index) => {
    //         item.querySelector('.experience-image').setAttribute('src', `${res.experienceObj[index].imageURL}`)
    //         item.querySelector('.sub-heading').textContent = `${res.experienceObj[index].cardSubHeading}`
    //         item.querySelector('.heading').textContent = `${res.experienceObj[index].cardHeading}`
    //         item.querySelector('.content').textContent = `${res.experienceObj[index].cardContent}`
    //     })
    // })
}