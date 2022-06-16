import { userRoute } from './routes/userRoute';
import { IAllRoutes, ISlicedRequest, IUserRoute } from '../../types';
import { ROUTE_NAMES } from '../../constants';

export const router = (slicedRequest: ISlicedRequest) => {
  const { basePath, routeName } = slicedRequest;

  const router = new Map<Array<string>, IAllRoutes>([
    [[ROUTE_NAMES.user, ROUTE_NAMES.users], userRoute()],
    [['zxvcs'], userRoute()],
  ]);
  console.log(router);

  userRoute().getUsers();
  return null;
};
