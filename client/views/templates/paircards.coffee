Template.paircards.helpers
  'firstPerson': () ->
    person = People.findOne(this.pair[0])
    return person
  'secondPerson': () ->
    person = People.findOne(this.pair[1])
    return person
  'persons': () ->
    return [
      People.findOne(this.pair[0]),
      People.findOne(this.pair[1]),
    ]

