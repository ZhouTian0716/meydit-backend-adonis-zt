import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Address from 'App/Models/Address';
import CreateAddressValidator from 'App/Validators/Address/CreateAddressValidator';
import UpdateAddressValidator from 'App/Validators/Address/UpdateAddressValidator';

export default class AddressesController {
  public async index({ response }: HttpContextContract) {
    try {
      const addresses = await Address.query().select('*');
      return response.status(200).json(addresses);
    } catch (error) {
      return error;
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const address = await Address.query().where('id', id).first();
      if (!address) return response.status(404).json({ message: 'Address not found' });
      return response.status(200).json(address);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const authUserId = auth.user?.$original.id;
      const payload = await request.validate(CreateAddressValidator);
      // ZT-NOTE: 这个是feature，创建的时候伴随修改，update方法里面也有考虑到
      // Check if user wants to set this address as primary
      if (payload.isPrimary) {
        const oldPrimaryAddress = await Address.query()
          .where((query) => {
            query.where('accountId', authUserId).where('isPrimary', true);
          })
          .first();
        if (oldPrimaryAddress) {
          await Address.query().where('id', oldPrimaryAddress.id).update({ isPrimary: false });
        }
      }
      // ZT-NOTE: 一对多的关系created，在创建address的时候
      const address = await auth
        .user!.related('addresses')
        .create({ ...payload, accountId: authUserId });
      // ZT-NOTE: 如果想要给返回值populate上parent，可以这样写
      // address.$setRelated('account', auth.user!);
      return response.status(201).json(address);
    } catch (error) {
      return error;
    }
  }

  public async update({ request, response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const address = await Address.query().where('id', id).first();
      if (!address) return response.status(404).json({ message: 'Address not found' });
      // ZT-NOTE: authUserId 是通过解析前端发来的token得到的
      const authUserId = auth.user?.$original.id;
      if (address.$original.accountId !== authUserId)
        return response.status(401).json({ message: 'Unauthorized' });
      const payload = await request.validate(UpdateAddressValidator);
      if (payload.isPrimary) {
        const oldPrimaryAddress = await Address.query()
          .where((query) => {
            query.where('accountId', authUserId).where('isPrimary', true);
          })
          .first();
        if (oldPrimaryAddress) {
          await Address.query().where('id', oldPrimaryAddress.id).update({ isPrimary: false });
        }
      }
      await Address.query().where('id', id).update(payload);
      const updated = await Address.findByOrFail('id', id);
      return response.status(200).json(updated);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const address = await Address.findBy('id', id);
      if (!address) return response.status(404).json({ message: 'Address not found' });
      const authUserId = auth.user?.$original.id;
      if (address.$original.accountId !== authUserId)
        return response.status(401).json({ message: 'Unauthorized' });
      await address.delete();
      response.status(200);
    } catch (error) {
      return error;
    }
  }
}

export const defaultAddress = {
  number: '',
  route: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  isPrimary: true,
};
