import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/auth.dto';

// In production this would come from Prisma via @social/database
// For now we use an in-memory store to keep the demo self-contained
const users: Record<string, { id: string; name: string; email: string; password: string; role: string; organizationId: string }> = {
  'admin@demo.com': {
    id: 'user_001',
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'password',
    role: 'ADMIN',
    organizationId: 'org_001',
  },
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async register(dto: RegisterDto): Promise<{ access_token: string; user: { id: string; name: string; email: string } }> {
    if (users[dto.email]) {
      throw new ConflictException('A user with this email already exists');
    }
    const orgId = `org_${Date.now()}`;
    const userId = `user_${Date.now()}`;
    const newUser = {
      id: userId,
      name: dto.name,
      email: dto.email,
      password: dto.password, // Production: bcrypt.hash(dto.password, 10)
      role: 'ADMIN',
      organizationId: orgId,
    };
    users[dto.email] = newUser;
    const payload = { sub: newUser.id, email: newUser.email, orgId, role: 'ADMIN' };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    };
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string; user: { id: string; name: string; email: string } }> {
    const user = users[email];
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { sub: user.id, email: user.email, orgId: user.organizationId, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
