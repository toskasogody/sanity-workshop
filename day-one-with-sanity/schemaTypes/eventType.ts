import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import {DoorsOpenInput} from './components/DoorsOpenInput'


export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fieldsets: [
    {name: 'dates', title: 'Dates', options: {columns: 2}},
  ],
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: ['details','editorial'],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule
      .required()
      .error('Required to generate a page on the website'),
      hidden: ({document}) => !document?.name,
      group: 'details',
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      options: {
        list: ['in-person','virtual'],
        layout: 'radio'
      },
      group: 'details',
      
    }),    
    defineField({
      name: 'startDate',
      type: 'datetime',
      group: 'details',
      fieldset: 'dates'
    }),
    defineField({
      name: 'endDate',
      type: 'datetime',
      group: 'details',
      fieldset: 'dates'
    }),
    defineField({
        name: 'doorsOpen',
        description: 'Number of minutes before the start time for admission',
        type: 'number',
        initialValue: 60,
        group: 'details',
        components: {
          input: DoorsOpenInput
        },
        readOnly: ({currentUser}) => {
          const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')
      
          return !isAdmin
        },
      }),
    defineField({
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
      readOnly: ({value, document}) => !value && document?.eventType == 'virtual',
      validation: (rule) =>
        rule.custom((value, context) => {
            if (value && context?.document?.eventType == 'virtual') {
                return 'Only in-person events can have a venue'
            }
            return true
        }),
        group: 'details',
    }),
    defineField({
      name: 'headline',
      type: 'reference',
      to: [{type: 'artist'}],
      group: 'details',
    }),
    defineField({
      name: 'image',
      type: 'image',
      group: 'editorial',
    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [{type: 'block'}],
      group: 'editorial',
    }),
    defineField({
      name: 'tickets',
      type: 'url',
      group: 'details',
    }),
    defineField({
      name: 'coupon',
      type: 'coupon',
    }),
   
    defineField({
      name: "coordinate",
      type: "object",
      options: {
        collapsed: true,
        columns: 2,
      },
      fields: [
        defineField({ name: "x", type: "number" }),
        defineField({ name: "y", type: "number" }),
      ],
    }),
  ],

preview: {
    select: {
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'startDate',
      image: 'image',
    },
    prepare({name, venue, artist,date, image}) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })
        : 'No date'
  
      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  }})