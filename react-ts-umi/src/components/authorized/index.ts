import Authorized from './authorized';
import renderAuthorize, { CurrentAuthority } from './renderAuthorize';

export { CurrentAuthority };
export default renderAuthorize(Authorized);