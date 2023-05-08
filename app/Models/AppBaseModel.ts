import { BaseModel } from '@ioc:Adonis/Lucid/Orm';
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStrategy';

export default class AppBaseModel extends BaseModel {
  // ZT-NOTE: toggle this to enable or disable camel case return for frontend
  public static namingStrategy = new CamelCaseNamingStrategy();
}
