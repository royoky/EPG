import moment from 'moment'
export const navigationState = {
  today: moment('11-26-2013', 'MM-DD-YYYY').set('h', moment().get('h')).set('m', moment().get('m')).format('X'),
  selectedCategory: null,
  categoryList: [],
  programList: [],
  programAll: []
}
