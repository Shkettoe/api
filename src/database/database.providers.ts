import DataSource from '../../ormconfig'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return DataSource.initialize()
    },
  },
]
