/**
 * Created By RObins
 * 30th June 2018
 */

export const QUERY_TYPE = [
  { key: 'and', text: 'and', value: 'and'},
  { key: 'or', text: 'or', value: 'or'}
]




const STRING_TYPE_FILTER = [
  { key: '123sdsdwcd45', text: 'contains', value: 'contains' },
  { key: '123sddfc46', text: 'does not contains', value: 'does_not_contains' },
  { key: '123scfvd47', text: 'is', value: 'is' },
  { key: '1234scd8', text: 'is not', value: 'is_not' },
  { key: '123csd49', text: 'is empty', value: 'is_empty' },
  { key: '12cvv350', text: 'is not empty', value: 'is_not_empty' },
]



const NUMBER_TYPE_FILTER = [
  { key: '123dfvb47', value: 'is', text: '=' },
  { key: '12dfv348', value: 'is_not', text: '≠' },
  { key: '12sdf50', value: 'gt', text: '>' },
  { key: '1235sf0', value: 'lt', text: '<' },
  { key: '1235ssd0', value: 'gte', text: '≥' },
  { key: '123sdfb50', value: 'lte', text: '≤' },
  { key: '1234vvfd9', value: 'is_empty', text: 'is empty' },
  { key: '1235sd0', value: 'is_not_empty', text: 'is not empty' }
]



const DATE_TYPE_FILTER = [
  { key: '123sdds47', text: 'is', value: 'is' },
  // { key: '123qff48', text: 'is within', value: 'is_within' },
  { key: '123eea49', text: 'is before', value: 'is_before' },
  { key: '12ae350', text: 'is after', value: 'is_after' },
  // { key: '123cd50', text: 'is on or before', value: 'is_on_or_before' },
  { key: '1cd2350', text: 'is not', value: 'is_not' },
  { key: '12cds350', text: 'is empty', value: 'is_empty' },
  { key: '12aef350', text: 'is not empty', value: 'is_not_empty' },
]


const BOOLEAN_TYPE_FILTER = [
  { key: '12vgd347', text: 'is', value: 'is' },
]



const ENUM_TYPE_FILTER = [
  { key: '123df47', text: 'is', value: 'is' },
  { key: '12fdb350', text: 'is not', value: 'is_not' },
  { key: '123dfv5hbh0', text: 'is empty', value: 'is_empty' },
  { key: '123dfv50', text: 'is not empty', value: 'is_not_empty' },
]


export const BOOLEAN_FIELD_VALUE = [
  {key: 'true', text: 'true', value: 'true'},
  {key: 'false', text: 'false', value: 'false'}
];

export const SORT_OPTIONS = [
  {key: 'ascending', value: 'ascending', text: 'ascending'},
  {key: 'descending', value: 'descending', text: 'descending'},
]


export const TYPE_PARSER = {
  string: STRING_TYPE_FILTER,
  number: NUMBER_TYPE_FILTER,
  date: DATE_TYPE_FILTER,
  boolean: BOOLEAN_TYPE_FILTER,
  enum: ENUM_TYPE_FILTER,
}
