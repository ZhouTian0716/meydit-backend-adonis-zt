import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Roles from 'App/Enums/Roles';
import Bid from 'App/Models/Bid';
import CreateBidValidator from 'App/Validators/Bid/CreateBidValidator';

export default class BidsController {
  public async index({ response }: HttpContextContract) {
    try {
      const bids = await Bid.query().select('*');
      return response.status(200).json(bids);
    } catch (error) {
      return error;
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const isMaker = auth.user?.$original.roleId === Roles.MAKER;
      // const selectedTags = request.query;
      if (!isMaker) {
        return response.unauthorized({
          errors: [{ message: 'Only makers can submit a Bid.' }],
        });
      }
      const payload = await request.validate(CreateBidValidator);
      const authUserId: number = auth.user?.$original.id;
      if (payload.makerId !== authUserId)
        return response.status(401).json({ message: 'Unauthorized' });
      const res = await Bid.create(payload);
      return response.status(201).json(res);
    } catch (error) {
      return response.badRequest(error);
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const { id } = params;
      const bid = await Bid.query().preload('maker').preload('project').where('id', id).first();
      if (!bid) return response.status(404).json({ message: 'Bid not found' });
      return response.status(200).json(bid);
    } catch (error) {
      return error;
    }
  }

  public async destroy({ response, params, auth }: HttpContextContract) {
    try {
      const { id } = params;
      const bid = await Bid.findBy('id', id);
      if (!bid) return response.status(404).json({ message: 'Bid not found' });
      const authUserId: number = auth.user?.$original.id;
      if (bid.$original.makerId !== authUserId)
        return response.status(401).json({ message: 'Unauthorized' });
      await bid.delete();
      return response.status(200).json({ deleted: bid });
    } catch (error) {
      return error;
    }
  }
}
