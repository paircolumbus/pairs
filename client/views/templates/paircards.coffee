Template.paircards.helpers
  'firstPerson': () ->
    console.log 'firstPerson'
    person = People.findOne(this.pair[0])
    console.log person
    return person
  'secondPerson': () ->
    console.log 'secondPerson'
    person = People.findOne(this.pair[1])
    console.log person
    return person
  'persons': () ->
    console.log this
    return [
      People.findOne(this.pair[0]),
      People.findOne(this.pair[1]),
    ]

