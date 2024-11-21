import { AssistanceRoutes } from './assistance';
import { UserRoutes } from './user';
import { RoleRoutes } from './role';
import { RoleUserRoutes } from './role_user';
import { AuthRoutes } from './auth';
import { RefreshTokenRoutes } from './refresh_token';


export class Routes {
    public assistanceRoutes: AssistanceRoutes = new AssistanceRoutes();
    public userRoutes: UserRoutes = new UserRoutes();
    public roleRoutes: RoleRoutes = new RoleRoutes();
    public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
    public authRoutes: AuthRoutes = new AuthRoutes();
    public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
}
