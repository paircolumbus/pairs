Template.pairCard.helpers
  'firstPerson': () ->
    console.log 'firstPerson'
    console.log this
    person = People.findOne(this.pair[0])
    console.log person
    return person
  'secondPerson': () ->
    console.log 'secondPerson'
    console.log this
    person = People.findOne(this.pair[1])
    console.log person
    return person
